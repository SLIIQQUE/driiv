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
 * Get the timezone offset string for America/Vancouver on a given date.
 * Vancouver observes DST: UTC-8 (PST) in winter, UTC-7 (PDT) in summer.
 * Returns e.g. "-07:00" or "-08:00".
 */
export function getVancouverOffset(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00Z");
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Vancouver",
    timeZoneName: "longOffset",
  });
  const parts = formatter.formatToParts(date);
  const offset = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT-08:00";
  return offset.replace("GMT", "");
}

/**
 * Convert an RFC 3339 timestamp to the hour in America/Vancouver.
 * Example: "2026-06-15T09:00:00-07:00" → 9 (9 AM Vancouver)
 */
function getVancouverHour(isoString: string): number {
  const date = new Date(isoString);
  return parseInt(
    date.toLocaleString("en-CA", {
      timeZone: "America/Vancouver",
      hour: "numeric",
      hour12: false,
    }),
    10,
  );
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

    const offset = getVancouverOffset(date);
    const timeMin = `${date}T00:00:00${offset}`;
    const timeMax = `${date}T23:59:59${offset}`;

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
        timeZone: "America/Vancouver",
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

      const startHour = getVancouverHour(period.start);
      const endHour = getVancouverHour(period.end);

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
 * Parse a preferredTime value into "HH:MM" format (24-hour).
 * Handles "10:00", "10:00 AM", "10:00AM", "2:00 PM", "2:00PM", etc.
 */
function parseTimeToHHMM(timeValue: string): string {
  // Match "HH:MM" optionally followed by AM/PM
  const match = timeValue.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?$/i);
  if (!match) {
    console.warn(`[Calendar] Unable to parse preferredTime: "${timeValue}" — using raw value`);
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

    // Build start and end date-time strings in America/Vancouver
    const offset = getVancouverOffset(isoDate);
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

    // Store only the booking reference in the calendar description — NOT full PII.
    // Instructors look up customer details in the admin dashboard.
    const ref = booking.id.slice(0, 8).toUpperCase();
    const description = [
      `Booking Ref: ${ref}`,
      `Lesson: ${booking.lessonName} (${booking.lessonPrice})`,
      `Date: ${booking.preferredDate} at ${booking.preferredTime}`,
      `Instructor: Refer to booking system`,
    ].join("\n");

    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `Driving Lesson — ${ref}`,
        description,
        colorId: "11",
        start: {
          dateTime: startDateTime,
          timeZone: "America/Vancouver",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "America/Vancouver",
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
