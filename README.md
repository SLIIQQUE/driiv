# DRIIV — Sophisticated Driver Education

> **DRIIV** (formerly RyDax) is a modern, AI-powered driving school platform serving Surrey, Langley, Delta, Richmond, Burnaby, and New Westminster, BC. Built with Next.js 16, Tailwind CSS v4, and powered by Groq AI.

[![Stack](https://img.shields.io/badge/Next.js-16.2-000?logo=next.js)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## Features

### 🚗 Online Booking System
- Multi-step booking wizard (lesson selection → date/time → details → confirm)
- Real-time availability synced with Google Calendar
- Three packages: **Foundation Pass** ($55/session), **Power Pack** ($250/5 sessions), **Mastery Bundle** ($450/10 sessions)
- Instant confirmation with booking reference
- Auto-generated Google Calendar events for every confirmed booking
- Email confirmations via Resend

### 🤖 AI Voice Concierge ("Alex")
- Natural language booking assistant powered by Groq (Qwen 3 32B)
- Handles pricing inquiries, service area lookups, and full booking flow
- Function calling for structured data extraction
- Context-aware conversations that feel human

### 📅 Google Calendar Integration
- **Availability** — checks the instructor's calendar via `freebusy.query` to grey out taken time slots
- **Event creation** — automatically creates a 1-hour calendar event with booking details when a student books
- **Diagnostic endpoint** (`/api/calendar/diagnose`) for troubleshooting the integration
- Powered by a Google Cloud service account with OAuth 2.0 (JWT)

### 📱 Responsive UI
- Mobile-first, fully responsive layout
- Dark theme with gold accent palette
- Smooth page transitions and micro-animations via Framer Motion
- Sidesheet booking overlay with multi-step wizard
- Loading states and error handling throughout

### 🔒 Security & SEO
- Content Security Policy (CSP) and security headers via `next.config.ts`
- Pre-commit hook that blocks secrets and `.env` files from being committed
- JSON-LD structured data (DrivingSchool schema, BreadcrumbList)
- Auto-generated sitemap and robots.txt
- Canonical URLs and Open Graph / Twitter Card metadata
- Skip-to-content link for accessibility

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
| **Email** | Resend |
| **Fonts** | Outfit (display), Space Mono (mono) |
| **Package Manager** | pnpm |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (or npm/yarn)
- A Groq API key (for the AI concierge)
- A Google Cloud service account with Calendar API enabled (for booking/availability)

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Groq API key for the AI concierge |
| `GROQ_MODEL` | No | Groq model (default: `qwen/qwen3-32b`) |
| `NEXT_PUBLIC_BASE_URL` | Yes | Public URL of the app |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | For calendar | Google Cloud service account email |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | For calendar | Service account private key (PEM) |
| `GOOGLE_CALENDAR_ID` | For calendar | Calendar to read/write (email or "primary") |
| `RESEND_API_KEY` | For email | Resend API key for booking confirmations |

### Install & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Or if you prefer Turbopack:
# next dev --turbopack

# Build for production
pnpm build

# Lint
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Project Structure

```
driiv/
├── app/                          # Next.js App Router pages & API routes
│   ├── about/                    # About page
│   ├── api/
│   │   ├── book/                 # POST/GET booking endpoint
│   │   ├── calendar/
│   │   │   ├── availability/     # GET available time slots
│   │   │   └── diagnose/         # GET calendar integration health check
│   │   └── voice/                # POST AI concierge endpoint
│   ├── areas/                    # Service areas page
│   ├── faq/                      # FAQ page
│   ├── features/                 # Features & benefits page
│   ├── pricing/                  # Pricing page
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   ├── testimonials/             # Student reviews
│   ├── layout.tsx                # Root layout (Navigation, Footer, Booking sidesheet)
│   ├── page.tsx                  # Homepage
│   ├── sitemap.ts                # Auto-generated sitemap
│   └── robots.ts                 # Robots.txt
├── src/
│   ├── components/
│   │   ├── booking/              # Booking wizard components
│   │   │   ├── BookingSidesheet.tsx    # Sidesheet overlay
│   │   │   ├── BookingSuccess.tsx      # Post-booking success screen
│   │   │   ├── BookingWizard.tsx       # Standalone full-page wizard
│   │   │   ├── StepLesson.tsx          # Step 1: choose lesson
│   │   │   ├── StepDateTime.tsx        # Step 2: choose date/time
│   │   │   ├── StepDetails.tsx         # Step 3: personal details
│   │   │   ├── StepConfirm.tsx         # Step 4: review & confirm
│   │   │   ├── CalendarGrid.tsx        # Date picker calendar
│   │   │   ├── TimeSlotGrid.tsx        # Time slot selector
│   │   │   └── ...
│   │   ├── home/                 # Homepage sections
│   │   ├── ui/                   # Reusable UI primitives
│   │   ├── Navigation.tsx        # Global navigation
│   │   └── Footer.tsx            # Global footer
│   ├── contexts/
│   │   └── BookingContext.tsx     # Booking sidesheet open/close state
│   ├── hooks/
│   │   └── useBooking.ts         # Booking wizard state management
│   ├── lib/
│   │   ├── bookings.ts           # Booking persistence (JSON file)
│   │   ├── booking-utils.ts      # Date formatting, calendar helpers
│   │   ├── google-calendar.ts    # Google Calendar API integration
│   │   ├── email.ts              # Resend email integration
│   │   ├── config.ts             # App configuration
│   │   └── voice-prompt.ts       # AI concierge system prompt & tools
│   └── types/
│       ├── booking.ts            # Booking & lesson types + pricing data
│       └── voice.ts              # Voice/chat type definitions
├── data/
│   └── bookings.json             # Local booking storage
├── .githooks/
│   └── pre-commit                # Blocks secrets & .env files from commits
└── public/                       # Static assets
```

---

## API Routes

### `POST /api/book`
Create a new booking. Returns `{ success, booking, message, calendar }`.

### `GET /api/book`
List all bookings from the local JSON store.

### `GET /api/calendar/availability?date=YYYY-MM-DD`
Returns busy time slots for a given date, fetched from Google Calendar.

### `GET /api/calendar/diagnose`
Runs a full diagnostic of the Google Calendar integration (auth, read, write) and returns the results.

### `POST /api/voice`
AI concierge endpoint. Accepts a conversation history, processes it with Groq + function calling, and returns a natural language response with optional tool call results.

---

## Booking Flow

1. **User clicks "Book Now"** — opens the sidesheet overlay (or navigates to the full-page wizard)
2. **Step 1 — Lesson**: Select Foundation Pass, Power Pack, or Mastery Bundle
3. **Step 2 — Date & Time**: Pick a date from the calendar; available time slots are filtered against Google Calendar in real time
4. **Step 3 — Details**: Enter name, email, phone, and optional notes
5. **Step 4 — Confirm**: Review everything and submit
6. **Success**: Booking is saved locally, a Google Calendar event is created, and a confirmation email is sent

The AI concierge can also drive the entire booking flow conversationally via the `/api/voice` endpoint.

---

## Deployment

The app is designed to deploy on **Vercel**. Connect your GitHub repository at [vercel.com/new](https://vercel.com/new) and set the environment variables listed above.

Every push to `main` triggers an automatic deployment.

---

## Development Notes

### Pre-commit Hook
The project includes a `.githooks/pre-commit` hook that:
- Blocks any `.env` file from being staged
- Scans staged files for secrets (private keys, API tokens) and rejects the commit if found

Git is configured to use this hook directory automatically (`core.hooksPath`).

### Diagnostics
If the Google Calendar integration isn't working, hit `/api/calendar/diagnose` to get a full breakdown of what's misconfigured — it tests auth, read access, and write access in sequence.

---

## License

Private — DRIIV Driving School. All rights reserved.
