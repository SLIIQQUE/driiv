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
 * Convert an RFC 3339 timestamp to the hour in Africa/Lagos (WAT, UTC+1).
 *
 * Nigeria does not observe DST, so the offset is always UTC+1 year-round.
 * Example: "2026-06-15T09:00:00+01:00" → 9 (9 AM Lagos)
 */
function getLagosHour(isoString: string): number {
  const date = new Date(isoString);
  return parseInt(
    date.toLocaleString("en-CA", {
      timeZone: "Africa/Lagos",
      hour: "numeric",
      hour12: false,
    }),
    10,
  );
}

/**
 * Return the Lagos timezone offset string.
 * Nigeria observes WAT (West Africa Time, UTC+1) year-round — no DST.
 */
export function getLagosOffset(): string {
  return "+01:00";
}

export interface BusySlotsResult {
  busySlots: string[];
  error: string | null;
}

/**
 * Fetch busy time slots from the Google Calendar for a given date.
 *
 * Uses the freebusy.query API to retrieve events and converts them into
 * hour-precision slot strings (e.g. "09:00", "14:00").
 *
 * Returns both the busy slots and any error that occurred. Callers should
 * check the error field and surface it to the user when present.
 *
 * @param date - Date string in "YYYY-MM-DD" format.
 */
export async function getBusySlots(date: string): Promise<BusySlotsResult> {
  try {
    const auth = createAuth();
    const calendar = google.calendar({ version: "v3", auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    const offset = getLagosOffset();
    const timeMin = `${date}T00:00:00${offset}`;
    const timeMax = `${date}T23:59:59${offset}`;

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
        timeZone: "Africa/Lagos",
      },
    });

    const calendarResult = response.data.calendars?.[calendarId];

    // Google returns HTTP 200 with an `errors` array on the calendar when
    // the calendar ID is unknown, auth is insufficient, or the calendar is
    // otherwise inaccessible. Check this before trusting the `busy` field.
    if (!calendarResult) {
      return {
        busySlots: [],
        error: `Calendar "${calendarId}" not found in Google response.`,
      };
    }

    if (calendarResult.errors && calendarResult.errors.length > 0) {
      const reasons = calendarResult.errors
        .map((e: { reason?: string | null; message?: string | null }) => e.reason ?? e.message ?? "unknown error")
        .join("; ");
      return {
        busySlots: [],
        error: `Calendar error: ${reasons}`,
      };
    }

    const busyPeriods = calendarResult.busy ?? [];
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

    return { busySlots: Array.from(busySlots).sort(), error: null };
  } catch (error) {
    console.error("Failed to fetch busy slots from Google Calendar:", error);
    return {
      busySlots: [],
      error: "The booking calendar is temporarily unavailable. Please try again later or contact us to book.",
    };
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
    const offset = getLagosOffset();
    const startDateTime = `${isoDate}T${hhmm}:00${offset}`;

    // Validate the datetime string before sending
    if (isNaN(new Date(startDateTime).getTime())) {
      throw new Error(`Invalid datetime constructed: "${startDateTime}" from date="${booking.preferredDate}" time="${booking.preferredTime}"`);
    }

    const [hours, minutes] = hhmm.split(":").map(Number);
    const endHour = hours + 1;
    const endDateTime = `${isoDate}T${String(endHour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00${offset}`;

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
