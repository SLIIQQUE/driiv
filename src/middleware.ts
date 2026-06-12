import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Rate Limiting Configuration
//
// In-memory Map-based approach for development / pre-production.
// For production deployments across multiple instances, swap this with
// Upstash Redis or a similar distributed store.
// ---------------------------------------------------------------------------

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

/**
 * Per-path rate limit rules.
 * Keys are URL pathname prefixes (matched with startsWith).
 */
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  "/api/voice": { limit: 5, windowMs: 60_000 },
  "/api/book": { limit: 10, windowMs: 60_000 },
};

/** Default limit applied to all other /api/* routes. */
const DEFAULT_API_LIMIT: RateLimitConfig = { limit: 60, windowMs: 60_000 };

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

/**
 * In-memory rate limit store.
 * Key format: "${ip}:${pathname}"
 * For production, replace with Upstash Redis or similar.
 */
const rateLimitStore = new Map<string, RateLimitEntry>();

/** Maximum POST body size in bytes (32 KB). */
const MAX_BODY_SIZE = 32_768;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolve the rate limit config for a given pathname.
 * Returns null for non-API routes (no rate limiting applied).
 */
function getRateLimitConfig(pathname: string): RateLimitConfig | null {
  for (const [prefix, config] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(prefix)) {
      return config;
    }
  }
  if (pathname.startsWith("/api/")) {
    return DEFAULT_API_LIMIT;
  }
  return null;
}

/**
 * Extract the client IP from the request.
 * Uses x-forwarded-for header (set by Vercel/proxies) or x-real-ip as
 * fallback. In local development without a proxy, falls back to "127.0.0.1".
 */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

/**
 * Purge expired entries from the rate limit store.
 * Called at the start of every middleware invocation instead of relying on
 * setInterval, which is unreliable in serverless/edge runtimes (may not
 * persist across cold starts).
 */
function cleanupStore(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Build a JSON error response with the security header attached.
 */
function jsonError(
  body: Record<string, unknown>,
  status: number,
  extraHeaders?: Record<string, string>,
): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: {
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // --- 1. Clean up expired rate limit entries ---
  cleanupStore();

  // --- 2. POST request validations (API routes only) ---
  if (method === "POST" && pathname.startsWith("/api/")) {
    // 2a. Request body size limit — check content-length header
    //     without consuming the body stream (so the route handler can read it).
    const contentLength = request.headers.get("content-length");
    if (contentLength) {
      const size = parseInt(contentLength, 10);
      if (!isNaN(size) && size > MAX_BODY_SIZE) {
        console.warn(
          `[Middleware] Body too large: ${size} bytes on ${method} ${pathname} from ${getClientIp(request)}`,
        );
        return jsonError({ error: "Request too large" }, 413);
      }
    }

    // 2b. Content-Type validation — all API POST endpoints expect JSON
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.warn(
        `[Middleware] Non-JSON Content-Type on ${method} ${pathname}: "${contentType}" from ${getClientIp(request)}`,
      );
      return jsonError(
        { error: "Content-Type must be application/json" },
        415,
      );
    }
  }

  // --- 3. Rate limiting (API routes only) ---
  const rateLimitConfig = getRateLimitConfig(pathname);
  if (rateLimitConfig) {
    const ip = getClientIp(request);
    const now = Date.now();
    const key = `${ip}:${pathname}`;

    let entry = rateLimitStore.get(key);

    // Start a new window if none exists or the current one has expired
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + rateLimitConfig.windowMs };
      rateLimitStore.set(key, entry);
    }

    entry.count++;

    if (entry.count > rateLimitConfig.limit) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      console.warn(
        `[Middleware] Rate limit exceeded for ${key}: ${entry.count - 1}/${rateLimitConfig.limit} — rejecting with 429`,
      );
      return jsonError(
        { error: "Too many requests", retryAfter },
        429,
        { "Retry-After": String(retryAfter) },
      );
    }
  }

  // --- 4. Pass through with security headers ---
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

// ---------------------------------------------------------------------------
// Matcher — only run middleware on API routes
// ---------------------------------------------------------------------------

export const config = {
  matcher: "/api/:path*",
};
