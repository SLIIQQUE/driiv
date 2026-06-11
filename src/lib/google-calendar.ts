import { google } from "googleapis";

interface BookingEvent {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  lessonName: string;
  lessonPrice: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

/**
 * Create a JWT auth client from environment variables.
 * The private key is expected to have literal \n sequences
 * (common in .env files) which are converted to actual newlines.
 */
function createAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!email || !key) {
    throw new Error(
      "Google Calendar credentials not configured. " +
        "Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.",
    );
  }

  // Strip surrounding quotes (from .env file wrapping)
  key = key.replace(/^["']|["']$/g, "");

  // Convert literal \n sequences to actual newlines for PEM format
  key = key.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

/**
 * Convert an RFC 3339 timestamp to the hour in Africa/Lagos (UTC+1).
 *
 * Africa/Lagos does not observe DST, so the offset is always +1 hour.
 * Example: "2026-06-10T08:00:00Z" → 9 (9 AM Lagos time)
 */
function getLagosHour(isoString: string): number {
  const date = new Date(isoString);
  return (date.getUTCHours() + 1) % 24;
}

/**
 * Fetch busy time slots from the Google Calendar for a given date.
 *
 * Uses the freebusy.query API to retrieve events and converts them into
 * hour-precision slot strings (e.g. "09:00", "14:00").
 *
 * On failure, returns an empty array (fail-open) so the user is never
 * blocked from seeing available slots.
 *
 * @param date - Date string in "YYYY-MM-DD" format.
 * @returns Sorted array of busy hour-precision slot strings.
 */
export async function getBusySlots(date: string): Promise<string[]> {
  try {
    const auth = createAuth();
    const calendar = google.calendar({ version: "v3", auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    const timeMin = `${date}T00:00:00+01:00`;
    const timeMax = `${date}T23:59:59+01:00`;

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
        timeZone: "Africa/Lagos",
      },
    });

    const busyPeriods = response.data.calendars?.[calendarId]?.busy ?? [];
    const busySlots = new Set<string>();

    for (const period of busyPeriods) {
      if (!period.start || !period.end) continue;

      const startHour = getLagosHour(period.start);
      const endHour = getLagosHour(period.end);

      // Mark every hour from start to end (exclusive) as busy
      for (let hour = startHour; hour < endHour; hour++) {
        busySlots.add(`${String(hour).padStart(2, "0")}:00`);
      }
    }

    return Array.from(busySlots).sort();
  } catch (error) {
    console.error("Failed to fetch busy slots from Google Calendar:", error);
    return [];
  }
}

/**
 * Parse a preferredDate value into a YYYY-MM-DD string.
 * Handles both "2026-06-15" (ISO) and "June 15, 2026" (display) formats.
 */
function parseDateToISO(dateValue: string): string {
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
  // Fallback — return as-is and let the API call fail with a clear error
  console.warn(`[Calendar] Unable to parse preferredDate: "${dateValue}" — using raw value`);
  return dateValue;
}

/**
 * Parse a preferredTime value into "HH:MM" format.
 * Handles "10:00", "10:00 AM", "10:00AM", etc.
 */
function parseTimeToHHMM(timeValue: string): string {
  // Strip AM/PM and trim
  const cleaned = timeValue.replace(/\s*(AM|PM|am|pm)\s*/g, "").trim();
  // If already HH:MM, return as-is
  if (/^\d{1,2}:\d{2}$/.test(cleaned)) {
    const [h, m] = cleaned.split(":");
    return `${String(Number(h)).padStart(2, "0")}:${m}`;
  }
  // Fallback
  console.warn(`[Calendar] Unable to parse preferredTime: "${timeValue}" — using raw value`);
  return timeValue;
}

/**
 * Create a 1-hour Google Calendar event for a confirmed booking.
 *
 * Returns the result so callers can decide how to surface errors,
 * but never throws — the booking is never blocked by a calendar failure.
 *
 * @param booking - The booking details used to populate the event.
 * @returns `{ success: true }` or `{ success: false, error: string }`
 */
export async function createBookingEvent(
  booking: BookingEvent,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const auth = createAuth();
    const calendar = google.calendar({ version: "v3", auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    // Safely parse date/time to handle both ISO and display formats
    const isoDate = parseDateToISO(booking.preferredDate);
    const hhmm = parseTimeToHHMM(booking.preferredTime);

    // Build start and end date-time strings in Africa/Lagos
    const startDateTime = `${isoDate}T${hhmm}:00+01:00`;

    // Validate the datetime string before sending
    if (isNaN(new Date(startDateTime).getTime())) {
      throw new Error(`Invalid datetime constructed: "${startDateTime}" from date="${booking.preferredDate}" time="${booking.preferredTime}"`);
    }

    const [hours, minutes] = hhmm.split(":").map(Number);
    const endHour = hours + 1;
    const endDateTime = `${isoDate}T${String(endHour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+01:00`;

    if (isNaN(new Date(endDateTime).getTime())) {
      throw new Error(`Invalid end datetime constructed: "${endDateTime}"`);
    }

    const description = [
      `Booking ID: ${booking.id}`,
      `Lesson: ${booking.lessonName} (${booking.lessonPrice})`,
      `Customer: ${booking.customerName}`,
      `Phone: ${booking.phone}`,
      `Email: ${booking.email}`,
      ...(booking.notes ? [`Notes: ${booking.notes}`] : []),
    ].join("\n");

    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `🚗 Driving Lesson — ${booking.customerName}`,
        description,
        colorId: "11",
        start: {
          dateTime: startDateTime,
          timeZone: "Africa/Lagos",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "Africa/Lagos",
        },
      },
    });

    console.log(
      "Google Calendar event created for booking:",
      booking.id,
      "→",
      response.data.htmlLink || response.data.id,
    );

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("FAILED to create Google Calendar event for booking", booking.id, ":", message);
    return { success: false, error: message };
  }
}
