import fs from "fs";
import path from "path";
import { Booking } from "@/types/booking";

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");
const BOOKINGS_BACKUP_FILE = path.join(process.cwd(), "data", "bookings.json.bak");

/**
 * Read existing bookings with fallback for corrupted file.
 * Returns an empty array on parse failure.
 */
function readBookingsSafe(): Booking[] {
  try {
    if (!fs.existsSync(BOOKINGS_FILE)) return [];
    const raw = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.error("bookings.json is not an array — resetting to empty");
      return [];
    }
    return parsed as Booking[];
  } catch (error) {
    console.error("Failed to parse bookings.json, trying backup:", error);
    // Try reading from backup
    try {
      if (fs.existsSync(BOOKINGS_BACKUP_FILE)) {
        const rawBackup = fs.readFileSync(BOOKINGS_BACKUP_FILE, "utf-8");
        const parsed = JSON.parse(rawBackup);
        if (Array.isArray(parsed)) {
          console.log("Recovered bookings from backup file");
          return parsed as Booking[];
        }
      }
    } catch {
      console.error("Backup file also corrupted — starting fresh");
    }
    return [];
  }
}

/**
 * Atomically write bookings: write to temp file, then rename.
 * This prevents partial writes from corrupting the file.
 */
function writeBookingsAtomic(bookings: Booking[]): void {
  const dir = path.dirname(BOOKINGS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write to a temp file first
  const tmpFile = BOOKINGS_FILE + ".tmp";
  fs.writeFileSync(tmpFile, JSON.stringify(bookings, null, 2));

  // Create backup of previous file if it exists
  if (fs.existsSync(BOOKINGS_FILE)) {
    try {
      fs.copyFileSync(BOOKINGS_FILE, BOOKINGS_BACKUP_FILE);
    } catch (err) {
      console.error("Failed to create backup:", err);
    }
  }

  // Atomic rename (prevents partial write corruption)
  fs.renameSync(tmpFile, BOOKINGS_FILE);
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
 * Normalize a preferredTime value to "HH:00" format (24-hour).
 * Handles "10:00", "10:00 AM", "10:00AM", "2:00 PM", "09:00", etc.
 */
function normalizeTime(timeValue: string): string {
  // Match "HH:MM" optionally followed by AM/PM
  const match = timeValue.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?$/i);
  if (!match) {
    return timeValue;
  }
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const meridian = (match[3] || "").toUpperCase();
  // Convert 12-hour to 24-hour
  if (meridian === "PM" && hours < 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

/**
 * Check if a given date/time slot is already booked.
 * Normalizes both stored and incoming values for consistent comparison.
 */
export function isSlotBooked(date: string, time: string): boolean {
  const existing = readBookingsSafe();
  const normDate = normalizeDate(date);
  const normTime = normalizeTime(time);
  return existing.some((b) => {
    const bDate = normalizeDate(b.preferredDate);
    const bTime = normalizeTime(b.preferredTime);
    return bDate === normDate && bTime === normTime;
  });
}

const MAX_SAVE_RETRIES = 3;

/**
 * Save a booking to the local JSON file with retry logic.
 *
 * Retries mitigate the TOCTOU race condition in serverless deployments
 * (multiple Lambda instances reading/writing simultaneously). On each
 * retry the file is re-read so the slot check uses the latest state.
 * For true atomicity, migrate to a database with transactions.
 */
export async function saveBooking(booking: Booking): Promise<void> {
  const dir = path.dirname(BOOKINGS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const slotDate = normalizeDate(booking.preferredDate);
  const slotTime = normalizeTime(booking.preferredTime);

  for (let attempt = 1; attempt <= MAX_SAVE_RETRIES; attempt++) {
    // Re-read on every attempt to get the latest state
    const existing = readBookingsSafe();

    // Check for double-booking
    const isSlotTaken = existing.some((b) => {
      const bDate = normalizeDate(b.preferredDate);
      const bTime = normalizeTime(b.preferredTime);
      return bDate === slotDate && bTime === slotTime;
    });

    if (isSlotTaken) {
      throw new Error("This time slot has already been booked. Please choose another time.");
    }

    // Try the write (attempt is final)
    existing.push(booking);
    try {
      writeBookingsAtomic(existing);
      return; // Success — exit
    } catch (writeError) {
      if (attempt === MAX_SAVE_RETRIES) {
        throw writeError; // Last attempt failed — propagate
      }
      console.warn(`saveBooking attempt ${attempt} failed, retrying...`, writeError);
      // Small delay before retry to let concurrent writes settle
      await new Promise((r) => setTimeout(r, 50 * attempt));
    }
  }
}

export async function getBookings(): Promise<Booking[]> {
  return readBookingsSafe();
}

/**
 * Get busy hour slots from local bookings for a given date (YYYY-MM-DD).
 * Returns time strings like ["09:00", "12:00"].
 * This ensures locally-stored bookings are always factored into availability,
 * even if the Google Calendar sync failed for those bookings.
 */
export function getLocalBusySlots(dateStr: string): string[] {
  try {
    const bookings = readBookingsSafe();
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
