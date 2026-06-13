# DRIIV — Sophisticated Driver Education

> **DRIIV** (formerly RyDax) is a modern, AI-powered driving school platform serving Surrey, Langley, Delta, Richmond, Burnaby, and New Westminster, BC. Built with Next.js 16, Tailwind CSS v4, Google Sheets backend, and powered by Groq AI.

[![Stack](https://img.shields.io/badge/Next.js-16.2-000?logo=next.js)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started — From Scratch](#getting-started--from-scratch)
- [Quick Start (Existing Setup)](#quick-start-existing-setup)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Booking Flow](#booking-flow)
- [Security Architecture](#security-architecture)
- [Documentation Index](#documentation-index)
- [Development Notes](#development-notes)
- [Deployment](#deployment)
- [License](#license)

---

## Features

### 🚗 Online Booking System
- Multi-step booking wizard (lesson selection → date/time → details → confirm)
- Real-time availability synced with Google Calendar (source of truth)
- Three packages: **Foundation Pass** ($55/session), **Power Pack** ($250/5 sessions), **Mastery Bundle** ($450/10 sessions)
- Instant confirmation with booking reference
- Auto-generated Google Calendar events for every confirmed booking
- Email confirmations via Resend
- **Google Sheets backend** — booking data stored in a collaborative spreadsheet, readable by non-technical staff

### 🤖 AI Voice Concierge ("Alex")
- Natural language booking assistant powered by Groq (Qwen 3 32B)
- Handles pricing inquiries, service area lookups, and full booking flow
- Function calling for structured data extraction
- Context-aware conversations that feel human
- Deferred-save semantics (validates before persisting)

### 📅 Google Calendar Integration
- **Availability** — checks the instructor's calendar via `freebusy.query` to grey out taken time slots (primary source of truth)
- **Event creation** — automatically creates a 1-hour calendar event when a student books
- **PII-free events** — calendar descriptions contain only booking reference, never customer name/phone/email
- **Diagnostic endpoint** (`/api/calendar/diagnose`) for troubleshooting
- Powered by a Google Cloud service account with OAuth 2.0 (JWT)

### 📊 Google Sheets Backend
- Collaborative spreadsheet replaces file-based JSON storage
- Human-readable for non-technical staff (no admin dashboard needed)
- PII stored in plaintext (Google's access controls handle security)
- Existing encrypted rows (from file-based era) still decrypted on read for backward compatibility
- AES-256-GCM encryption module preserved for future use

### 📱 Responsive UI
- Mobile-first, fully responsive layout
- Dark theme with gold accent palette
- Smooth page transitions and micro-animations via Framer Motion
- Sidesheet booking overlay with multi-step wizard
- Loading states and error handling throughout

### 🔒 Security
- **Rate limiting** — per-IP limits on all API endpoints (5/min voice, 10/min book, 60/min GET)
- **CSRF protection** — Origin/Referer header validation on all POST endpoints
- **Request body limits** — 32KB max on POST requests
- **Content-Type enforcement** — JSON-only on POST endpoints
- **PII encryption** — AES-256-GCM at rest (legacy support for encrypted rows)
- **XSS prevention** — HTML escaping in all email templates
- **Bearer token auth** — `ADMIN_API_KEY` on admin endpoints (fail-closed)
- **Security headers** — HSTS, CSP, X-Frame-Options, COOP, CORP, Permissions-Policy
- **Pre-commit hook** — blocks secrets and `.env` files from being committed
- **Diagnose endpoint hardened** — no info leakage, ADMIN_API_KEY gated

### 🌐 SEO & Accessibility
- JSON-LD structured data (DrivingSchool schema, BreadcrumbList)
- Auto-generated sitemap and robots.txt
- Canonical URLs and Open Graph / Twitter Card metadata
- Skip-to-content link for accessibility
- Focus-visible outlines, aria-labels, semantic HTML

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, React 19, React Compiler) |
| **Styling** | Tailwind CSS v4, CSS variables |
| **Animation** | Framer Motion (`motion/react`) |
| **Icons** | Lucide React |
| **AI** | Groq API (Qwen 3 32B) + function calling |
| **Calendar** | Google Calendar API (`googleapis`) |
| **Database** | Google Sheets API (`googleapis`) |
| **Auth (internal)** | Bearer token (`ADMIN_API_KEY`) |
| **PII Encryption** | AES-256-GCM (Node.js `crypto`) |
| **Email** | Resend |
| **Rate Limiting** | In-memory Map (edge middleware) |
| **Fonts** | Outfit (display), Space Mono (mono) |
| **Package Manager** | pnpm |
| **Deployment** | Vercel |

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│                   Edge Middleware (middleware.ts)              │
│  • Rate limiting per IP    • Body size check (32KB max)      │
│  • Content-Type enforcement • Security headers                │
└──────────────────────┬───────────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────────┐
│                     Next.js App Router                        │
├─────────────────┬──────────────────┬─────────────────────────┤
│  POST /api/book │  POST /api/voice │  Public Pages            │
│  GET /api/book  │                  │  (/, /pricing, /faq…)    │
│  /api/calendar/*│                  │                          │
└────────┬────────┴────────┬─────────┴────────┬────────────────┘
         │                 │                   │
         ▼                 ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│ Google       │  │ Google       │  │ Groq API         │
│ Sheets       │  │ Calendar     │  │ (Qwen 3 32B)     │
│ (bookings)   │  │ (availability │  │ (voice concierge)│
│              │  │  + events)   │  └──────────────────┘
└──────────────┘  └──────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │ Resend       │
                   │ (email)      │
                   └──────────────┘
```

### Data Flow

**Write Path (Booking):**
```
User submits booking → CSRF check → Validate input → saveBooking() →
   1. Append row to Google Sheets
   2. Create event in Google Calendar (PII-free)
   3. Send confirmation email via Resend
```

**Read Path (Availability):**
```
User picks date → GET /api/calendar/availability →
   1. Query Google Calendar freebusy (primary source of truth)
   2. Cross-reference with Sheets (fallback)
   3. Return merged busy slots
```

---

## Getting Started — From Scratch

If you're setting up DRIIV with **all-new accounts and credentials**, follow the comprehensive setup guide:

📄 **[docs/account-setup-guide.md](docs/account-setup-guide.md)**

This 986-line guide walks you through creating every account from zero:

1. **Google Cloud Platform** — new project, service account, enable Calendar + Sheets APIs
2. **Google Calendar** — dedicated "DRIIV Bookings" calendar
3. **Google Sheets** — booking spreadsheet with 13-column header row
4. **Groq** — API key for the AI concierge
5. **Resend** — domain verification and email API key
6. **Local environment** — clone, install, generate all keys
7. **Vercel deployment** — all 11 environment variables, deploy, verify
8. **Full integration test** — end-to-end booking flow verification
9. **Security checklist** — 10-point pre-launch verification

---

## Quick Start (Existing Setup)

### Prerequisites

- Node.js 20+
- pnpm (preferred) or npm/yarn
- Existing credentials for all services (see [Environment Variables](#environment-variables))

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Lint
pnpm lint

# Type-check
pnpm tsc --noEmit
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Environment Variables

The app requires **11 environment variables**. For production, all must be set in **Vercel Environment Variables**. For local development, copy the template:

```bash
# There is no .env.example — use .env.production as a reference
# and create .env.local with your actual values
```

| Variable | Required | Source | Description |
|---|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | [Groq Console](https://console.groq.com/keys) | AI concierge API key |
| `GROQ_MODEL` | ✅ Yes | Fixed | Groq model — `qwen/qwen3-32b` |
| `NEXT_PUBLIC_BASE_URL` | ✅ Yes | Your domain | Public URL (`http://localhost:3000` in dev) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | ✅ Yes | GCP service account JSON → `client_email` | JWT auth for Calendar + Sheets |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | ✅ Yes | GCP service account JSON → `private_key` | RSA private key (wrapped in quotes with `\n`) |
| `GOOGLE_CALENDAR_ID` | ✅ Yes | Google Calendar settings | Calendar to read/write events |
| `SHEET_ID` | ✅ Yes | Google Sheets URL (between `/d/` and `/edit`) | Spreadsheet for booking records |
| `ADMIN_API_KEY` | ✅ Yes | `openssl rand -hex 32` | Bearer token for admin endpoints |
| `RESEND_API_KEY` | ✅ Yes | [Resend Dashboard](https://resend.com/api-keys) | Email delivery API key |
| `RESEND_FROM_EMAIL` | ✅ Yes | Your verified domain | Sender address (e.g., `noreply@yourdomain.com`) |
| `ENCRYPTION_KEY` | ⚠️ Legacy | `openssl rand -hex 32` | AES-256-GCM key (for decrypting legacy encrypted rows) |

### Key Rotation

📄 **[docs/key-rotation-guide.md](docs/key-rotation-guide.md)** — Step-by-step guide for rotating any credential, including Google Sheets setup.

---

## Project Structure

```
driiv/
├── app/                              # Next.js App Router
│   ├── about/                        # About page
│   ├── api/
│   │   ├── book/                     # POST/GET booking endpoint
│   │   ├── calendar/
│   │   │   ├── availability/         # GET available time slots
│   │   │   └── diagnose/             # GET integration health (auth-gated)
│   │   └── voice/                    # POST AI concierge endpoint
│   ├── areas/                        # Service areas
│   ├── faq/                          # FAQ
│   ├── features/                     # Features & benefits
│   ├── pricing/                      # Pricing (powers voice concierge data)
│   ├── privacy/                      # Privacy policy
│   ├── terms/                        # Terms of service
│   ├── testimonials/                 # Student reviews
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Homepage
│   ├── sitemap.ts                    # Auto-generated sitemap
│   └── robots.ts                     # Robots.txt
├── src/
│   ├── components/
│   │   ├── booking/                  # Booking wizard (4 steps + sidesheet)
│   │   │   ├── BookingSidesheet.tsx
│   │   │   ├── BookingSuccess.tsx
│   │   │   ├── BookingWizard.tsx
│   │   │   ├── StepLesson.tsx
│   │   │   ├── StepDateTime.tsx
│   │   │   ├── StepDetails.tsx
│   │   │   ├── StepConfirm.tsx
│   │   │   ├── CalendarGrid.tsx
│   │   │   ├── TimeSlotGrid.tsx
│   │   │   └── ...
│   │   ├── home/                     # Homepage sections
│   │   ├── ui/                       # Reusable UI primitives
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── contexts/
│   │   └── BookingContext.tsx         # Booking sidesheet state
│   ├── data/
│   │   ├── programs.ts               # Canonical pricing data
│   │   ├── navigation.ts             # Shared nav items
│   │   └── testimonials.ts           # Shared testimonials
│   ├── hooks/
│   │   ├── useBooking.ts             # Booking wizard state
│   │   └── useVoiceAssistant.ts      # AI concierge chat state
│   ├── lib/
│   │   ├── bookings.ts               # Booking persistence (Google Sheets)
│   │   ├── booking-utils.ts          # Client-side date/calendar helpers
│   │   ├── google-auth.ts            # Shared JWT auth (Calendar + Sheets)
│   │   ├── google-calendar.ts        # Google Calendar API
│   │   ├── google-sheets.ts          # Google Sheets API (row CRUD)
│   │   ├── email.ts                  # Resend email integration
│   │   ├── encryption.ts             # AES-256-GCM PII encryption
│   │   ├── csrf.ts                   # Origin/Referer CSRF validation
│   │   ├── config.ts                 # App configuration
│   │   └── voice-prompt.ts           # AI system prompt & tools
│   ├── middleware.ts                 # Edge middleware (rate limiting, security)
│   └── types/
│       ├── booking.ts                # Booking & lesson types
│       └── voice.ts                  # Voice/chat type definitions
├── .githooks/
│   └── pre-commit                    # Blocks secrets & .env from commits
├── docs/
│   ├── account-setup-guide.md        # From-scratch account creation guide
│   ├── key-rotation-guide.md         # Credential rotation + Sheets setup
│   ├── SECURITY_AUDIT.md             # Full security audit report
│   └── adr/                          # Architecture Decision Records
│       ├── 001-csp-hardening.md
│       ├── 002-security-middleware-architecture.md
│       ├── 003-architecture-review-recommendations.md
│       └── 004-google-sheets-backend.md
├── SECURITY_AUDIT.md                 # Security audit (June 12, 2026)
├── next.config.ts                    # Security headers, image config
└── public/                           # Static assets
```

---

## API Routes

### `POST /api/book`
Create a new booking.

**Headers:** `Content-Type: application/json`  
**Auth:** Origin/Referer must match `NEXT_PUBLIC_BASE_URL` (CSRF)  
**Rate limit:** 10 requests/minute/IP  
**Body:**
```json
{
  "customerName": "Jane Doe",
  "phone": "+1 604 555 0123",
  "email": "jane@example.com",
  "lessonId": "foundation",
  "lessonName": "Foundation Pass",
  "lessonPrice": "$55.00",
  "preferredDate": "2026-06-20",
  "preferredTime": "10:00 AM",
  "notes": "First time driver"
}
```

**Response (200):**
```json
{
  "success": true,
  "booking": { "...": "..." },
  "message": "Booking confirmed! We'll see you on the road.",
  "calendar": "synced",
  "email": "sent"
}
```

### `GET /api/book`
List all bookings (admin only).

**Headers:** `Authorization: Bearer <ADMIN_API_KEY>`  
**Rate limit:** 60 requests/minute/IP

**Response (200):**
```json
{
  "bookings": [ "...all booking objects..." ]
}
```

### `GET /api/calendar/availability?date=YYYY-MM-DD`
Get busy time slots for a date.

**Rate limit:** 60 requests/minute/IP

**Response (200):**
```json
{
  "date": "2026-06-20",
  "busySlots": ["09:00", "10:00", "14:00"]
}
```

### `GET /api/calendar/diagnose`
Calendar integration health check (admin only).

**Headers:** `Authorization: Bearer <ADMIN_API_KEY>`  
**Rate limit:** 60 requests/minute/IP

**Response (200):** Full diagnostic JSON with credentials status, auth test, read/write access, and Sheets connectivity.

### `POST /api/voice`
AI Concierge conversational booking.

**Headers:** `Content-Type: application/json`  
**Rate limit:** 5 requests/minute/IP

**Body:**
```json
{
  "messages": [
    { "role": "user", "content": "I'd like to book a lesson" }
  ]
}
```

---

## Booking Flow

1. **User clicks "Book Now"** — opens the booking sidesheet
2. **Step 1 — Lesson**: Select Foundation Pass, Power Pack, or Mastery Bundle
3. **Step 2 — Date & Time**: Pick a date; available slots fetched from Google Calendar in real time
4. **Step 3 — Details**: Enter name, email, phone, notes
5. **Step 4 — Confirm**: Review all details and submit
6. **Processing**:
   - ✅ CSRF origin check passes
   - ✅ Input validated server-side (name, phone, email, date, time)
   - ✅ Double-booking check against Sheets (3-attempt retry)
   - ✅ Row appended to Google Sheets
   - ✅ Calendar event created (PII-free description)
   - ✅ Confirmation email sent via Resend
7. **Success** — booking reference shown, calendar sync status, email delivery status

The AI Concierge can also drive the entire flow conversationally via `/api/voice`.

---

## Security Architecture

### Layered Defense

| Layer | What It Protects | Implementation |
|---|---|---|
| **1. Edge Middleware** | All API endpoints | Rate limiting, body size limits, Content-Type enforcement, security headers |
| **2. CSRF Protection** | POST endpoints | Origin/Referer header validation against `NEXT_PUBLIC_BASE_URL` |
| **3. Input Validation** | Booking + Voice APIs | Server-side validation (name, phone, email, date, time, lessonId) |
| **4. Double-Booking Prevention** | Booking slots | Re-read sheet on each retry attempt → check conflict → write |
| **5. Bearer Auth** | Admin endpoints (`GET /api/book`, diagnose) | `ADMIN_API_KEY` — fail-closed if missing |
| **6. PII Protection** | Customer data at rest | AES-256-GCM encryption (legacy rows); Google Sheets access controls (new rows) |
| **7. XSS Prevention** | Email clients | HTML escaping of all user-supplied values in email templates |
| **8. Security Headers** | Browser clients | HSTS (2yr preload), CSP, X-Frame-Options, COOP, CORP, Permissions-Policy |
| **9. Pre-commit Hook** | Git history | Blocks `.env` files and secret patterns from commits |
| **10. Audit Trail** | Incident response | Structured console logging on all auth failures, booking events, API errors |

### Audit History

**June 11, 2026** — Initial security audit. Score: **D (~20/100)**.  
**June 12, 2026** — Comprehensive security audit. Score: **D (42/100)**. Improvements: authenticated GET /api/book, PII-free calendar events, double-booking retry, pre-commit hook.  
**June 12, 2026** — Remediation sprint complete. Fixes applied: Next.js 16.2.2→16.2.6 (5 CVEs), rate limiting, CSRF, XSS fix, HSTS + security headers, PII encryption, Google Sheets backend, diagnose endpoint hardening.

📄 **[docs/SECURITY_AUDIT.md](docs/SECURITY_AUDIT.md)** — Full audit report with OWASP Top 10, STRIDE threat models, 20 findings, and remediation roadmap.

---

## Documentation Index

| Document | Description |
|---|---|
| **[docs/account-setup-guide.md](docs/account-setup-guide.md)** | Create every account from absolute zero (986 lines) |
| **[docs/key-rotation-guide.md](docs/key-rotation-guide.md)** | Rotate credentials + Google Sheets setup |
| **[docs/SECURITY_AUDIT.md](docs/SECURITY_AUDIT.md)** | Full security audit with 20 findings |
| **[docs/adr/001-csp-hardening.md](docs/adr/001-csp-hardening.md)** | CSP strategy (nonce-based, 3-phase migration) |
| **[docs/adr/002-security-middleware-architecture.md](docs/adr/002-security-middleware-architecture.md)** | Edge middleware design |
| **[docs/adr/003-architecture-review-recommendations.md](docs/adr/003-architecture-review-recommendations.md)** | Storage, auth, secrets architecture decisions |
| **[docs/adr/004-google-sheets-backend.md](docs/adr/004-google-sheets-backend.md)** | Google Sheets as booking backend design |
| **next.config.ts** | Security headers configuration |

---

## Development Notes

### Pre-commit Hook

The project includes a `.githooks/pre-commit` hook that:
- Blocks any `.env*` file from being staged
- Scans staged files for secrets (private keys, API tokens) and rejects the commit if found

The hook is automatically configured via a `postinstall` script (`git config core.hooksPath .githooks`). If you need to bypass it temporarily (e.g., for documentation), use `git commit --no-verify`.

### Middleware in Development

The edge middleware (`src/middleware.ts`) works in production but is **not invoked** by the Next.js dev server on API routes. To test rate limiting, CSRF, and body size limits, run:

```bash
pnpm build && pnpm start
```

### Google Sheets Tab Name

The sheet tab must be named **"Bookings"** (not "Sheet1"). The code references `SHEET_TAB = "Bookings"` in `src/lib/google-sheets.ts`. If you renamed the tab differently, update the constant to match.

### Diagnostics

If Calendar or Sheets integration isn't working:

```bash
# Test with admin auth (replace KEY with your ADMIN_API_KEY)
curl -H "Authorization: Bearer <KEY>" http://localhost:3000/api/calendar/diagnose
```

This returns credential status, auth test results, Calendar read/write access, and Sheets connectivity.

---

## Deployment

The app is designed to deploy on **Vercel**.

1. Push the repository to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. **Set all 11 environment variables** in Project Settings → Environment Variables
4. Deploy
5. (Optional) Add a custom domain and update `NEXT_PUBLIC_BASE_URL`

Every push to `main` triggers an automatic deployment.

---

## License

Private — DRIIV Driving School. All rights reserved.
