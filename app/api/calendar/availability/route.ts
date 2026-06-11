import { NextResponse } from "next/server";
import { getBusySlots } from "@/lib/google-calendar";
import { getLocalBusySlots } from "@/lib/bookings";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { error: "Missing required query parameter: date" },
        { status: 400 },
      );
    }

    if (!DATE_REGEX.test(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Expected YYYY-MM-DD." },
        { status: 400 },
      );
    }

    // Fetch busy slots from Google Calendar
    const result = await getBusySlots(date);

    // Also fetch busy slots from local bookings (covers cases where
    // Google Calendar sync failed, or bookings haven't synced yet)
    const localBusy = getLocalBusySlots(date);

    // Merge both sources — use a Set to deduplicate
    const mergedBusy = Array.from(new Set([
      ...(result.busySlots || []),
      ...localBusy,
    ])).sort();

    // If there's a Google Calendar error BUT we have local data, still return
    // with a warning rather than failing entirely
    if (result.error && localBusy.length === 0) {
      return NextResponse.json(
        { error: result.error },
        { status: 503 },
      );
    }

    return NextResponse.json({
      date,
      busySlots: mergedBusy,
      ...(result.error ? { calendarError: result.error } : {}),
    });
  } catch (error) {
    console.error("Availability check error:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 },
    );
  }
}
