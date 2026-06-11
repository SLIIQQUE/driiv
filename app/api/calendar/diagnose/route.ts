import { NextResponse } from "next/server";

/**
 * Diagnostic endpoint to test Google Calendar connection.
 * Hit this to see exactly what's wrong with the integration.
 */
export async function GET() {
  const results: Record<string, unknown> = {
    env: {},
    auth: null,
    calendarAccess: null,
    createEvent: null,
  };

  // 1. Check environment variables
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  results.env = {
    GOOGLE_SERVICE_ACCOUNT_EMAIL: email || "MISSING",
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: key
      ? `Present (${key.length} chars, starts with: ${key.substring(0, 30)}...)`
      : "MISSING",
    GOOGLE_CALENDAR_ID: calendarId || "MISSING (will default to 'primary')",
    keyHasQuotes: key ? key.startsWith('"') || key.startsWith("'") : null,
  };

  if (!email || !key) {
    return NextResponse.json({
      status: "ERROR",
      message: "Missing credentials in environment variables",
      ...results,
    });
  }

  // 2. Test auth creation
  try {
    const { google } = await import("googleapis");

    // Process key the same way as the service
    let processedKey = key.replace(/^["']|["']$/g, "");
    processedKey = processedKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email,
      key: processedKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    results.auth = { status: "OK", email };

    // 3. Test calendar access - try freebusy
    try {
      const calendar = google.calendar({ version: "v3", auth });
      const calId = calendarId || "primary";

      const now = new Date();
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

      const freebusyRes = await calendar.freebusy.query({
        requestBody: {
          timeMin: `${today}T00:00:00+01:00`,
          timeMax: `${today}T23:59:59+01:00`,
          items: [{ id: calId }],
          timeZone: "Africa/Lagos",
        },
      });

      const busy = freebusyRes.data.calendars?.[calId];
      results.calendarAccess = {
        status: "OK",
        calendarId: calId,
        busyPeriods: busy?.busy?.length || 0,
        errors: busy?.errors || null,
      };

      // 4. Test event creation
      try {
        const testEvent = await calendar.events.insert({
          calendarId: calId,
          requestBody: {
            summary: "🔧 DRIIV Diagnostic Test — delete me",
            description: "This is a diagnostic test event. Please delete.",
            start: {
              dateTime: `${today}T23:00:00+01:00`,
              timeZone: "Africa/Lagos",
            },
            end: {
              dateTime: `${today}T23:01:00+01:00`,
              timeZone: "Africa/Lagos",
            },
          },
        });

        const createResult: Record<string, unknown> = {
          status: "OK",
          eventId: testEvent.data.id,
          htmlLink: testEvent.data.htmlLink,
        };

        // Clean up the test event
        if (testEvent.data.id) {
          await calendar.events.delete({
            calendarId: calId,
            eventId: testEvent.data.id,
          });
          createResult.cleanedUp = true;
        }
        results.createEvent = createResult;
      } catch (writeError) {
        results.createEvent = {
          status: "FAILED",
          error: writeError instanceof Error ? writeError.message : String(writeError),
          errorStack: writeError instanceof Error ? writeError.stack : null,
        };
      }
    } catch (readError) {
      results.calendarAccess = {
        status: "FAILED",
        error: readError instanceof Error ? readError.message : String(readError),
        errorStack: readError instanceof Error ? readError.stack : null,
      };
    }
  } catch (authError) {
    results.auth = {
      status: "FAILED",
      error: authError instanceof Error ? authError.message : String(authError),
    };
  }

  const hasErrors = Object.values(results).some(
    (v) => v && typeof v === "object" && "status" in (v as object) && (v as { status: string }).status === "FAILED",
  );

  return NextResponse.json({
    status: hasErrors ? "ISSUES_DETECTED" : "ALL_OK",
    ...results,
  });
}
