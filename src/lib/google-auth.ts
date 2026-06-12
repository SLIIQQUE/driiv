/**
 * Shared Google Service Account Authentication
 *
 * Provides a JWT auth client factory used by both Google Calendar and
 * Google Sheets modules. The caller specifies which OAuth scopes are
 * required for the intended API.
 *
 * Environment variables:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  — Service account email address
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY — RSA private key (PEM format)
 *
 * The private key is expected to use literal \n sequences (common in
 * .env files) which are converted to actual newlines for PEM parsing.
 */

import { google } from "googleapis";

/**
 * Default scopes used when none are explicitly provided (Calendar only).
 */
const CALENDAR_SCOPES = ["https://www.googleapis.com/auth/calendar"];

/**
 * Create a JWT auth client from environment variables.
 *
 * @param scopes - Array of OAuth scope URLs. Defaults to Calendar scope.
 * @returns A configured JWT client ready for use with Google APIs.
 * @throws If GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY are missing.
 */
export function createAuth(scopes?: string[]) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!email || !key) {
    throw new Error(
      "Google credentials not configured. " +
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
    scopes: scopes ?? CALENDAR_SCOPES,
  });
}
