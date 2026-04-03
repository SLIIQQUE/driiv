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