import fs from "fs";
import path from "path";
import { Booking } from "@/types/booking";

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");

export async function saveBooking(booking: Booking): Promise<void> {
  const dir = path.dirname(BOOKINGS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const existing: Booking[] = fs.existsSync(BOOKINGS_FILE)
    ? JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"))
    : [];

  existing.push(booking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(existing, null, 2));
}

export async function getBookings(): Promise<Booking[]> {
  if (!fs.existsSync(BOOKINGS_FILE)) return [];
  return JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"));
}

/**
 * Normalize a preferredDate value to YYYY-MM-DD format.
 * Handles both "2026-06-15" (ISO) and "June 15, 2026" (display) formats.
 */
function normalizeDate(dateValue: string): string {
  // Already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return dateValue;
  }
  // Try parsing with Date constructor (handles "June 15, 2026" etc.)
  const d = new Date(dateValue);
  if (!isNaN(d.getTime())) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // Fallback — return as-is
  return dateValue;
}

/**
 * Normalize a preferredTime value to "HH:00" format.
 * Handles "10:00", "10:00 AM", "10:00AM", "09:00", etc.
 */
function normalizeTime(timeValue: string): string {
  // Strip AM/PM and trim
  const cleaned = timeValue.replace(/\s*(AM|PM|am|pm)\s*/g, "").trim();
  // Extract hour portion
  const match = cleaned.match(/^(\d{1,2}):\d{2}$/);
  if (match) {
    return `${String(Number(match[1])).padStart(2, "0")}:00`;
  }
  // Fallback — return as-is
  return timeValue;
}

/**
 * Get busy hour slots from local bookings for a given date (YYYY-MM-DD).
 * Returns time strings like ["09:00", "12:00"].
 * This ensures locally-stored bookings are always factored into availability,
 * even if the Google Calendar sync failed for those bookings.
 */
export function getLocalBusySlots(dateStr: string): string[] {
  try {
    const bookings = fs.existsSync(BOOKINGS_FILE)
      ? JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"))
      : [];

    const busySlots = new Set<string>();

    for (const booking of bookings) {
      if (!booking.preferredDate || !booking.preferredTime) continue;
      const bookingDate = normalizeDate(booking.preferredDate);
      if (bookingDate !== dateStr) continue;
      const normalizedTime = normalizeTime(booking.preferredTime);
      busySlots.add(normalizedTime);
    }

    return Array.from(busySlots).sort();
  } catch (error) {
    console.error("Failed to read local bookings for availability:", error);
    return [];
  }
}