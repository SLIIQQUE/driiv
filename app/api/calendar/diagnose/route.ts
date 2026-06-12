import { NextResponse } from "next/server";
import { createAuth } from "@/lib/google-auth";
import { verifySheetsAccess } from "@/lib/google-sheets";

/**
 * Diagnostic endpoint for Google Calendar and Sheets connectivity.
 *
 * Gated behind ADMIN_API_KEY auth — does NOT expose any secrets, key
 * lengths, credential previews, or stack traces in its responses.
 * Returns only pass/fail status with generic error messages.
 */
export async function GET(request: Request) {
  // Gate behind ADMIN_API_KEY (same pattern as GET /api/book).
  // Fail-closed: if the key is missing or doesn't match, return a generic
  // "not available" response with no information leakage.
  const authHeader = request.headers.get("authorization");
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json(
      { error: "Diagnostics unavailable" },
      { status: 404 },
    );
  }

  // Run diagnostics (with generic status reporting only)
  try {
    const { google } = await import("googleapis");

    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
    const sheetId = process.env.SHEET_ID;

    // Check basic credential presence (no details exposed)
    const googleCreds = email && key ? "PRESENT" : "MISSING";
    const sheetEnv = sheetId ? "PRESENT" : "MISSING";

    if (googleCreds === "MISSING") {
      return NextResponse.json({
        status: "ISSUES_DETECTED",
        env: "Missing credentials — check GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
        calendarAuth: "NOT_CHECKED",
        calendarAccess: "NOT_CHECKED",
        createEvent: "NOT_CHECKED",
        sheetsAccess: "NOT_CHECKED",
      });
    }

    // Build auth client (same logic as google-auth.ts)
    let processedKey = key!.replace(/^["']|["']$/g, "");
    processedKey = processedKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email,
      key: processedKey,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendarAuthStatus: Record<string, unknown> = { status: "OK" };
    let calendarStatus: Record<string, unknown> = { status: "NOT_CHECKED" };
    let createStatus: Record<string, unknown> = { status: "NOT_CHECKED" };

    // Test calendar access via freebusy
    try {
      const calendar = google.calendar({ version: "v3", auth });
      const now = new Date();
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

      const freebusyRes = await calendar.freebusy.query({
        requestBody: {
          timeMin: `${today}T00:00:00-07:00`,
          timeMax: `${today}T23:59:59-07:00`,
          items: [{ id: calendarId }],
          timeZone: "America/Vancouver",
        },
      });

      const busy = freebusyRes.data.calendars?.[calendarId];
      calendarStatus = {
        status: busy?.errors ? "FAILED" : "OK",
        calendarId,
      };

      if (busy?.errors) {
        calendarStatus.error = "Calendar access returned errors — check the calendar ID and sharing permissions.";
        // Skip event creation if calendar is inaccessible
        createStatus = { status: "SKIPPED", reason: "Calendar access failed" };
      } else {
        // Test event creation
        try {
          const testEvent = await calendar.events.insert({
            calendarId,
            requestBody: {
              summary: "DRIIV Diagnostic Test — delete me",
              description: "Diagnostic test event. Please delete.",
              start: {
                dateTime: `${today}T23:00:00-07:00`,
                timeZone: "America/Vancouver",
              },
              end: {
                dateTime: `${today}T23:01:00-07:00`,
                timeZone: "America/Vancouver",
              },
            },
          });

          createStatus = { status: "OK", eventCreated: true };

          // Clean up test event
          if (testEvent.data.id) {
            await calendar.events.delete({
              calendarId,
              eventId: testEvent.data.id,
            });
          }
        } catch {
          createStatus = {
            status: "FAILED",
            error: "Could not create a test calendar event — check write permissions.",
          };
        }
      }
    } catch {
      calendarStatus = {
        status: "FAILED",
        error: "Could not query Google Calendar — check credentials and network connectivity.",
      };
    }

    // Test Sheets connectivity (separate auth with sheets scope)
    let sheetsStatus: Record<string, unknown> = { status: "NOT_CHECKED" };
    if (sheetEnv === "PRESENT") {
      try {
        const sheetsAuth = createAuth(["https://www.googleapis.com/auth/spreadsheets"]);
        const result = await verifySheetsAccess(sheetsAuth);
        sheetsStatus = {
          status: result.ok ? "OK" : "FAILED",
        };
        if (!result.ok) {
          sheetsStatus.error = "Could not access the Google Sheet — check SHEET_ID and sharing permissions.";
        }
      } catch {
        sheetsStatus = {
          status: "FAILED",
          error: "Could not access the Google Sheet — check credentials and network connectivity.",
        };
      }
    } else {
      sheetsStatus = {
        status: "SKIPPED",
        reason: "SHEET_ID not configured — set it to enable sheet connectivity checks.",
      };
    }

    const hasErrors = [
      calendarAuthStatus,
      calendarStatus,
      createStatus,
      sheetsStatus,
    ].some(
      (s) => s.status === "FAILED",
    );

    return NextResponse.json({
      status: hasErrors ? "ISSUES_DETECTED" : "ALL_OK",
      env: { googleCreds, sheetEnv },
      calendarAuth: calendarAuthStatus,
      calendarAccess: calendarStatus,
      createEvent: createStatus,
      sheetsAccess: sheetsStatus,
    });
  } catch (error) {
    // Catch-all — generic message, no stack trace, no implementation details
    console.error("[Diagnose] Unexpected error:", error);
    return NextResponse.json({
      status: "ISSUES_DETECTED",
      error: "An unexpected error occurred while running diagnostics.",
    });
  }
}
