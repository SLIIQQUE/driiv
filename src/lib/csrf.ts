/**
 * CSRF Protection — Origin/Referer header validation.
 *
 * Validates that incoming requests originate from a trusted domain,
 * mitigating Cross-Site Request Forgery (CSRF) attacks.
 *
 * Usage in route handlers:
 *   import { validateOrigin } from "@/lib/csrf";
 *   const check = validateOrigin(request, allowedOrigins);
 *   if (!check.valid) return NextResponse.json({ error: check.reason }, { status: 403 });
 */

export interface OriginValidationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Validate the Origin or Referer header of a request against a list of
 * allowed origins. Origin is checked first (more reliable), with Referer
 * as fallback for clients that do not send Origin (e.g. some older bots).
 *
 * @param request - The incoming Request object.
 * @param allowedOrigins - Array of allowed origin strings (e.g. ["https://driiv.net", "http://localhost:3000"]).
 * @returns `{ valid: true }` or `{ valid: false, reason: string }`.
 */
export function validateOrigin(
  request: Request,
  allowedOrigins: string[],
): OriginValidationResult {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const source = origin ?? referer;

  if (!source) {
    return {
      valid: false,
      reason: "Missing Origin/Referer header. This request may be a CSRF attempt.",
    };
  }

  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return {
      valid: false,
      reason: "Invalid Origin/Referer URL — could not parse as a valid URL.",
    };
  }

  if (allowedOrigins.includes(url.origin)) {
    return { valid: true };
  }

  return {
    valid: false,
    reason: `Origin "${url.origin}" is not in the allowed origins list.`,
  };
}
