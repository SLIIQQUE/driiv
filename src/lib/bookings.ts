/**
 * Bookings Persistence Layer — Google Sheets Backend
 *
 * Replaces the previous file-based storage (data/bookings.json) with the
 * Google Sheets API. Key design decisions:
 *
 *   - **Google Sheets** is the persistent store for booking records.
 *   - **Google Calendar** remains the source of truth for availability.
 *   - **PII encryption** is applied before writing to Sheets.
 *   - **Retry logic** handles transient Sheets API failures (3 attempts).
 *
 * Public API (unchanged from the file-based version):
 *   - saveBooking(booking)    → append row to sheet (with retry + double-booking check)
 *   - getBookings()           → read all rows from sheet (PII decrypted)
 *   - isSlotBooked(date,time) → check slot from sheet data
 *   - getLocalBusySlots(date) → busy slots from sheet data for a date
 *
 * ⚠️  All public functions are now async (they make HTTP calls to Google Sheets).
 *     Callers that previously called them synchronously must use `await`.
 */

import { createAuth } from "@/lib/google-auth";
import {
  appendBookingRow,
  getAllBookings as getSheetsAllBookings,
  isSlotBooked as sheetsIsSlotBooked,
  getLocalBusySlots as sheetsGetLocalBusySlots,
} from "@/lib/google-sheets";
import { encryptPII, decryptPII } from "@/lib/encryption";
import type { Booking } from "@/types/booking";

// ────────────────────────────────────────────────────────────
//  Encryption helpers
// ────────────────────────────────────────────────────────────

/**
 * Encrypt PII fields in a booking for persistent storage.
 * If already encrypted, returns the booking unchanged (idempotent).
 */
function encryptBookingPII(booking: Booking): Booking {
  if (booking.piiEncrypted) return booking;

  return {
    ...booking,
    customerName: encryptPII(booking.customerName),
    phone: encryptPII(booking.phone),
    email: encryptPII(booking.email),
    piiEncrypted: true,
  };
}

/**
 * Decrypt PII fields in a booking for runtime use.
 * If not encrypted, returns the booking unchanged (idempotent).
 */
function decryptBookingPII(booking: Booking): Booking {
  if (!booking.piiEncrypted) return booking;

  return {
    ...booking,
    customerName: decryptPII(booking.customerName),
    phone: decryptPII(booking.phone),
    email: decryptPII(booking.email),
    piiEncrypted: false,
  };
}

// ────────────────────────────────────────────────────────────
//  Schema validation
// ────────────────────────────────────────────────────────────

/** Basic email regex — validates a@b.c format. */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a single booking entry from storage.
 *
 * Checks presence of all required fields, their types, and format
 * constraints for non-encrypted PII values.
 *
 * @returns An error string if invalid, or `null` if valid.
 */
function validateBookingEntry(entry: unknown): string | null {
  if (!entry || typeof entry !== "object") {
    return "Entry is not an object";
  }

  const b = entry as Record<string, unknown>;

  // --- Required fields (all must be present, non-null strings) ---
  const requiredFields = [
    "id",
    "customerName",
    "phone",
    "email",
    "lessonId",
    "lessonName",
    "preferredDate",
    "preferredTime",
  ] as const;

  for (const field of requiredFields) {
    if (b[field] === undefined || b[field] === null) {
      return `Missing required field: "${field}"`;
    }
    if (typeof b[field] !== "string") {
      return `Field "${field}" must be a string, got ${typeof b[field]}`;
    }
    if ((b[field] as string).length === 0) {
      return `Field "${field}" must not be empty`;
    }
  }

  // Sanity: id shouldn't be absurdly long
  if ((b.id as string).length > 64) {
    return `Field "id" exceeds maximum length (64 chars)`;
  }

  // --- PII format validation (only for non-encrypted entries) ---
  if (!b.piiEncrypted) {
    // customerName: max 100 chars
    if ((b.customerName as string).length > 100) {
      return `Field "customerName" exceeds 100 characters`;
    }

    // phone: must contain 7–15 digits (allow common formatting chars)
    const phoneDigits = (b.phone as string).replace(/[\s\-\(\)\+\.]/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return `Field "phone" must contain 7–15 digits (found ${phoneDigits.length})`;
    }
    if (!/^\d+$/.test(phoneDigits)) {
      return `Field "phone" contains non-digit characters`;
    }

    // email: basic format check
    if (!EMAIL_REGEX.test(b.email as string)) {
      return `Field "email" has invalid format`;
    }
  }

  return null; // Valid entry
}

/**
 * Filter, validate, and decrypt an array of raw booking objects.
 * Invalid entries are skipped with a warning rather than crashing the read.
 */
function processEntries(rawEntries: Booking[]): Booking[] {
  const valid: Booking[] = [];
  let skipped = 0;

  for (let i = 0; i < rawEntries.length; i++) {
    const entry = rawEntries[i];
    const error = validateBookingEntry(entry);

    if (error) {
      const id = (entry as unknown as Record<string, unknown>)?.id ?? `index ${i}`;
      console.warn(`[bookings] Skipping entry ${id}: ${error}`);
      skipped++;
      continue;
    }

    // Decrypt PII if stored encrypted
    valid.push(decryptBookingPII(entry as Booking));
  }

  if (skipped > 0) {
    console.warn(
      `[bookings] Skipped ${skipped} of ${rawEntries.length} entries due to validation errors`,
    );
  }

  return valid;
}

// ────────────────────────────────────────────────────────────
//  Date/time normalization
// ────────────────────────────────────────────────────────────

/**
 * Normalize a `preferredDate` to YYYY-MM-DD format.
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

  return dateValue; // fallback — let downstream validation catch it
}

/**
 * Normalize a `preferredTime` to HH:MM (24-hour) format.
 * Handles "10:00", "10:00 AM", "10:00AM", "2:00 PM", "09:00", etc.
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

// ────────────────────────────────────────────────────────────
//  Public API
// ────────────────────────────────────────────────────────────

const MAX_SAVE_RETRIES = 3;

/**
 * Save a booking to the Google Sheet with retry logic.
 *
 * **PII Encryption:**
 *   `customerName`, `phone`, and `email` are encrypted with AES-256-GCM
 *   before being written to the sheet. The `piiEncrypted` flag is set to `true`.
 *
 * **TOCTOU Retry:**
 *   In serverless environments, concurrent requests may race to read the
 *   sheet and append. This function re-reads the sheet on each retry attempt
 *   to check for conflicts. For true atomicity, consider using Google Sheets
 *   locking or a transactional database.
 *
 * @throws {Error} with message "already been booked" on slot conflict.
 * @throws {Error} on write failure after exhausting retries.
 */
export async function saveBooking(booking: Booking): Promise<void> {
  const slotDate = normalizeDate(booking.preferredDate);
  const slotTime = normalizeTime(booking.preferredTime);

  for (let attempt = 1; attempt <= MAX_SAVE_RETRIES; attempt++) {
    const auth = createAuth(["https://www.googleapis.com/auth/spreadsheets"]);

    // Re-read the sheet on every attempt for the latest state (TOCTOU mitigation)
    const existing = await getSheetsAllBookings(auth);

    // Check for double-booking
    const isSlotTaken = existing.some((b) => {
      const bDate = normalizeDate(b.preferredDate);
      const bTime = normalizeTime(b.preferredTime);
      return bDate === slotDate && bTime === slotTime;
    });

    if (isSlotTaken) {
      throw new Error(
        "This time slot has already been booked. Please choose another time.",
      );
    }

    // Encrypt PII for the new booking, then append to sheet
    const encryptedBooking = encryptBookingPII(booking);

    try {
      await appendBookingRow(auth, encryptedBooking);
      return; // Success — exit
    } catch (writeError) {
      if (attempt === MAX_SAVE_RETRIES) {
        throw writeError; // Last attempt — propagate the error
      }

      console.warn(
        `[bookings] saveBooking attempt ${attempt}/${MAX_SAVE_RETRIES} failed, retrying...`,
        writeError,
      );
      await new Promise((r) => setTimeout(r, 50 * attempt));
    }
  }
}

/**
 * Retrieve all bookings from the Google Sheet with PII decrypted.
 *
 * ⚠️  PII is returned in plaintext. The caller MUST ensure this data is
 *     only exposed to authenticated/authorized users. The GET /api/book
 *     endpoint requires an `ADMIN_API_KEY` bearer token.
 */
export async function getBookings(): Promise<Booking[]> {
  const auth = createAuth(["https://www.googleapis.com/auth/spreadsheets"]);
  const rawBookings = await getSheetsAllBookings(auth);
  return processEntries(rawBookings);
}

/**
 * Check if a given date/time slot is already booked (from sheet data).
 *
 * Normalizes both stored and incoming values for consistent comparison.
 * This is an async call because it reads from the Google Sheet.
 */
export async function isSlotBooked(date: string, time: string): Promise<boolean> {
  const auth = createAuth(["https://www.googleapis.com/auth/spreadsheets"]);
  return sheetsIsSlotBooked(auth, date, time);
}

/**
 * Get busy hour slots from the Google Sheet for a given date (YYYY-MM-DD).
 *
 * Returns time strings like `["09:00", "12:00"]`. This ensures locally
 * stored bookings are always factored into availability, even if the
 * Google Calendar sync failed for those bookings.
 *
 * Only compares date/time fields — no PII is needed or accessed.
 */
export async function getLocalBusySlots(dateStr: string): Promise<string[]> {
  try {
    const auth = createAuth(["https://www.googleapis.com/auth/spreadsheets"]);
    return await sheetsGetLocalBusySlots(auth, dateStr);
  } catch (error) {
    console.error("[bookings] Failed to read local bookings for availability:", error);
    return [];
  }
}
