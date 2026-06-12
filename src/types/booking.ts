import { PROGRAMS, type Program } from "@/data/programs";

export type Lesson = Program;
export const LESSONS: Lesson[] = PROGRAMS;

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  lessonId: string;
  lessonName: string;
  lessonPrice: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  /**
   * Tracks whether PII fields (customerName, phone, email) are encrypted on disk.
   * - `true`  → stored encrypted; decrypt after reading
   * - `false` / `undefined` → stored as plaintext (legacy data or dev mode)
   *
   * In-memory bookings are always plaintext. Encryption/decryption happens
   * transparently in the persistence layer (src/lib/bookings.ts).
   */
  piiEncrypted?: boolean;
}

export const BOOKING_HOURS = {
  weekday: [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
  ],
  saturday: [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00",
  ],
} as const;
