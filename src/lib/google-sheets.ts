/**
 * Google Sheets Persistence Layer
 *
 * Provides low-level CRUD operations against a Google Sheet used as the
 * primary persistent store for booking records.
 *
 * Each booking is stored as a single row. The first row is a header row.
 * PII encryption/decryption is handled by the caller (src/lib/bookings.ts).
 *
 * Requires SHEET_ID environment variable to be set to the spreadsheet ID
 * (the long string in the sheet's URL).
 *
 * Column layout:
 *   A: id              B: customerName     C: phone
 *   D: email           E: lessonId         F: lessonName
 *   G: lessonPrice     H: preferredDate    I: preferredTime
 *   J: notes           K: status           L: createdAt
 *   M: piiEncrypted
 */

import { google } from "googleapis";
import type { Booking } from "@/types/booking";

// ────────────────────────────────────────────────────────────
//  Configuration
// ────────────────────────────────────────────────────────────

/** The sheet tab name (defaults to "Bookings" per ADR-004 setup). */
const SHEET_TAB = "Bookings";

/**
 * Resolve the SHEET_ID from the environment.
 * @throws If SHEET_ID is not configured.
 */
function getSheetId(): string {
  const id = process.env.SHEET_ID;
  if (!id || id.trim().length === 0) {
    throw new Error(
      "SHEET_ID is not configured. Set SHEET_ID in your environment variables " +
        "to the Google Spreadsheet ID (found in the sheet's URL).",
    );
  }
  return id.trim();
}

// ────────────────────────────────────────────────────────────
//  Row ↔ Booking conversion
// ────────────────────────────────────────────────────────────

/**
 * Convert an array of cell values (a sheet row) into a Booking object.
 *
 * Returns `null` if the row is empty or has too few columns.
 * Date/time normalization and PII decryption are NOT performed here;
 * they are handled upstream in src/lib/bookings.ts.
 */
function rowToBooking(row: unknown[]): Booking | null {
  if (!row || row.length < 10) return null;

  // Convert all values to strings (spreadsheet cells may be numbers)
  const cols = row.map((cell) => String(cell ?? ""));

  // Skip empty rows (all blank)
  if (cols.every((c) => c.trim() === "")) return null;

  return {
    id: cols[0] || "",
    customerName: cols[1] || "",
    phone: cols[2] || "",
    email: cols[3] || "",
    lessonId: cols[4] || "",
    lessonName: cols[5] || "",
    lessonPrice: cols[6] || "",
    preferredDate: cols[7] || "",
    preferredTime: cols[8] || "",
    notes: cols[9] || "",
    status: (cols[10] as Booking["status"]) || "pending",
    createdAt: cols[11] || new Date().toISOString(),
    piiEncrypted: cols[12]?.toLowerCase() === "true",
  };
}

/**
 * Convert a Booking object into an array of cell values for a sheet row.
 *
 * NOTE: PII fields (customerName, phone, email) should be encrypted BEFORE
 * calling this function. The piiEncrypted flag is set in the output row.
 */
function bookingToRow(booking: Booking): string[] {
  return [
    booking.id,
    booking.customerName,
    booking.phone,
    booking.email,
    booking.lessonId,
    booking.lessonName,
    booking.lessonPrice,
    booking.preferredDate,
    booking.preferredTime,
    booking.notes || "",
    booking.status,
    booking.createdAt,
    booking.piiEncrypted ? "true" : "false",
  ];
}

// ────────────────────────────────────────────────────────────
//  Public API
// ────────────────────────────────────────────────────────────

/**
 * Append a single booking row to the sheet.
 *
 * @param auth - Authenticated JWT client (from createAuth).
 * @param booking - The booking to persist. PII should already be encrypted.
 * @throws If SHEET_ID is missing or the API call fails.
 */
export async function appendBookingRow(
  auth: InstanceType<typeof google.auth.JWT>,
  booking: Booking,
): Promise<void> {
  const sheets = google.sheets({ version: "v4", auth });
  const sheetId = getSheetId();

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: SHEET_TAB,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [bookingToRow(booking)],
    },
  });
}

/**
 * Read ALL booking rows from the sheet.
 *
 * Skips the header row. Returns an empty array if the sheet is empty
 * or has only a header row.
 *
 * @param auth - Authenticated JWT client (from createAuth).
 * @returns All booking rows as raw Booking objects (PII still encrypted).
 * @throws If SHEET_ID is missing or the API call fails.
 */
export async function getAllBookings(
  auth: InstanceType<typeof google.auth.JWT>,
): Promise<Booking[]> {
  const sheets = google.sheets({ version: "v4", auth });
  const sheetId = getSheetId();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: SHEET_TAB,
  });

  const rows = response.data.values as unknown[][] | undefined;
  if (!rows || rows.length <= 1) {
    // No data rows — only header or completely empty
    return [];
  }

  // Skip header row (index 0), convert remaining rows
  const bookings: Booking[] = [];
  for (let i = 1; i < rows.length; i++) {
    const booking = rowToBooking(rows[i]);
    if (booking && booking.id) {
      bookings.push(booking);
    }
  }

  return bookings;
}

/**
 * Find a single booking by its UUID.
 *
 * @returns The booking, or `null` if not found.
 */
export async function getBookingById(
  auth: InstanceType<typeof google.auth.JWT>,
  id: string,
): Promise<Booking | null> {
  const bookings = await getAllBookings(auth);
  return bookings.find((b) => b.id === id) ?? null;
}

/**
 * Check whether a specific date/time slot is already booked in the sheet.
 *
 * @param auth - Authenticated JWT client.
 * @param date - Date string (will be normalized).
 * @param time - Time string (will be normalized).
 * @returns `true` if the slot is taken by any booking.
 */
export async function isSlotBooked(
  auth: InstanceType<typeof google.auth.JWT>,
  date: string,
  time: string,
): Promise<boolean> {
  // Read all bookings from sheet and check for conflicts.
  // Each call fetches the full sheet; for high-traffic scenarios consider
  // caching or querying only the relevant date range via a filter.
  const bookings = await getAllBookings(auth);
  const normDate = normalizeDate(date);
  const normTime = normalizeTime(time);

  return bookings.some((b) => {
    const bDate = normalizeDate(b.preferredDate);
    const bTime = normalizeTime(b.preferredTime);
    return bDate === normDate && bTime === normTime;
  });
}

/**
 * Get all busy time slots from the sheet for a given date.
 *
 * @param auth - Authenticated JWT client.
 * @param dateStr - Date in "YYYY-MM-DD" format.
 * @returns Sorted array of busy time strings (e.g. ["09:00", "14:00"]).
 */
export async function getLocalBusySlots(
  auth: InstanceType<typeof google.auth.JWT>,
  dateStr: string,
): Promise<string[]> {
  const bookings = await getAllBookings(auth);
  const busySlots = new Set<string>();

  for (const booking of bookings) {
    if (!booking.preferredDate || !booking.preferredTime) continue;

    const bookingDate = normalizeDate(booking.preferredDate);
    if (bookingDate !== dateStr) continue;

    const normalizedTime = normalizeTime(booking.preferredTime);
    busySlots.add(normalizedTime);
  }

  return Array.from(busySlots).sort();
}

/**
 * Verify that the Google Sheet is accessible with the given auth.
 *
 * @param auth - Authenticated JWT client.
 * @returns `{ ok: true }` on success, or `{ ok: false, error: string }` on failure.
 */
export async function verifySheetsAccess(
  auth: InstanceType<typeof google.auth.JWT>,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const sheetId = getSheetId();

    await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${SHEET_TAB}!A1:A1`,
    });

    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[google-sheets] verifySheetsAccess failed:", message);
    return { ok: false, error: message };
  }
}

// ────────────────────────────────────────────────────────────
//  Date/time normalization (mirrored from bookings.ts)
// ────────────────────────────────────────────────────────────

/**
 * Normalize a date string to YYYY-MM-DD format.
 * Handles "2026-06-15" (ISO) and "June 15, 2026" (display) formats.
 */
function normalizeDate(dateValue: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return dateValue;
  }

  const d = new Date(dateValue);
  if (!isNaN(d.getTime())) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return dateValue; // fallback
}

/**
 * Normalize a time string to HH:MM (24-hour) format.
 * Handles "10:00", "10:00 AM", "2:00 PM", etc.
 */
function normalizeTime(timeValue: string): string {
  const match = timeValue.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?$/i);
  if (!match) return timeValue;

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const meridian = (match[3] || "").toUpperCase();

  if (meridian === "PM" && hours < 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}
