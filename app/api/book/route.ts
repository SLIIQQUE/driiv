import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createBookingEvent } from "@/lib/google-calendar";

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");

function getExistingBookings() {
  if (!fs.existsSync(BOOKINGS_FILE)) return [];
  return JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName, phone, email,
      lessonId, lessonName, lessonPrice,
      preferredDate, preferredTime, notes,
    } = body;

    if (!customerName || !phone || !email || !lessonId || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const booking = {
      id: crypto.randomUUID(),
      customerName,
      phone,
      email,
      lessonId,
      lessonName,
      lessonPrice,
      preferredDate,
      preferredTime,
      notes: notes || "",
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    const dir = path.dirname(BOOKINGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const existing = getExistingBookings();
    existing.push(booking);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(existing, null, 2));

    console.log("Booking saved:", booking.id);

    // Create Google Calendar event (never blocks the booking response)
    const calendarResult = await createBookingEvent(booking);
    if (!calendarResult.success) {
      console.error(
        "Calendar event failed for booking",
        booking.id,
        "—",
        calendarResult.error,
      );
    }

    return NextResponse.json({
      success: true,
      booking,
      message: "Booking confirmed! We'll see you on the road.",
      calendar: calendarResult.success ? "synced" : "failed",
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const existing = getExistingBookings();
    return NextResponse.json({ bookings: existing });
  } catch {
    return NextResponse.json(
      { error: "Failed to get bookings" },
      { status: 500 },
    );
  }
}
