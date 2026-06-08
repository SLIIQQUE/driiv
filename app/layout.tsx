import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const VoiceAssistant = dynamic(
  () => import("@/components/VoiceAssistant").then((mod) => ({ default: mod.VoiceAssistant }))
);

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const baseUrl = "https://rydax.net";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "RyDax Driving School Surrey — ICBC Road Test Prep",
    template: "%s | RyDax",
  },
  description:
    "RyDax Driving School in Surrey BC. Expert driving lessons in Rosedale. ICBC road test prep, beginner & advanced packages. Book your first lesson today.",
  keywords: [
    "driving school Surrey",
    "driving lessons Rosedale",
    "ICBC road test Surrey",
    "driving instructor Langley",
    "RyDax driving school",
    "driving lesson packages Surrey",
    "ICBC road test preparation",
    "beginner driving lessons",
    "advanced driving lessons Surrey",
    "driving lesson prices Surrey",
    "affordable driving lessons Surrey",
    "driving school Surrey areas",
    "driving lessons Langley",
    "driving instructor Delta",
    "driving school Cloverdale",
    "service areas Surrey BC",
  ],
  authors: [{ name: "RyDax Driving School" }],
  creator: "RyDax Driving School",
  publisher: "RyDax Driving School",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: `${baseUrl}/site.webmanifest`,
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: baseUrl,
    siteName: "RyDax Driving School",
    title: "RyDax Driving School Surrey — ICBC Road Test Prep",
    description:
      "RyDax Driving School in Surrey BC. Expert driving lessons in Rosedale. ICBC road test prep, beginner & advanced packages. Book your first lesson today.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "RYDAX — Premier Driving School in Surrey, Langley & Rosedale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rydax",
    creator: "@rydax",
    title: "RyDax Driving School Surrey — ICBC Road Test Prep",
    description:
      "RyDax Driving School in Surrey BC. Expert driving lessons in Rosedale. ICBC road test prep, beginner & advanced packages. Book your first lesson today.",
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google-site-verification-code",
  },
  other: {
    "theme-color": "#1A2B48",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "RyDax",
    "msapplication-TileColor": "#1A2B48",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "@id": `${baseUrl}/#drivingschool`,
    name: "RYDAX",
    description:
      "Modern AI-powered driving school in Surrey, BC. Online booking, automated reminders, and ICBC licensed instruction.",
    url: baseUrl,
    telephone: "+1-604-123-4567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "12588 68A Ave",
      addressLocality: "Surrey",
      addressRegion: "BC",
      postalCode: "V3W 1M2",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.1272748,
      longitude: -122.8740839,
    },
    areaServed: [
      { "@type": "Place", name: "Surrey" },
      { "@type": "Place", name: "Langley" },
      { "@type": "Place", name: "Delta" },
      { "@type": "Place", name: "Richmond" },
      { "@type": "Place", name: "New Westminster" },
      { "@type": "Place", name: "Burnaby" },
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 92,
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah Mitchell",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "I booked my inaugural session at 11 PM on a Tuesday and received confirmation before I could put my phone down. The automated pulses meant I never once lost a session. After every lesson, the digital dashboard revealed my progress with surgical clarity. Passed my Class 7 on the first attempt. From first click to license — entirely frictionless.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "James Thompson",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "Zero experience to licensed in fourteen days. The AI concierge answered every question before I committed. I paid online, received reminders before each rendezvous, and the progress metrics revealed compounding skill gains session by session. No paperwork. No phone calls. Pure modern mastery.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Emma Richardson",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "After failing twice with conventional schools, RYDAX diagnosed and corrected my deficiencies in three sessions. The ability to book online, pay by card, and review my progress intelligence after each session eliminated every ounce of guesswork. The entire ecosystem operates in perfect orchestration.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "David Clarke",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "The orchestration is what distinguishes this experience. Booked, paid, tracked — all from a single device. Never wrote a cheque, never waited on hold. The AI answered my inquiries at midnight. This is what driver education should feel like when technology is engineered around the student.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Lisa Watson",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "What convinced me was the elimination of phone calls. Everything exists online — booking, payment, reminders. The progress intelligence after each session is extraordinary. I watched my scores compound from 60% to 95% over eight sessions. Passed with a near-perfect evaluation.",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Michael Brown",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "The search ends here. The technology orchestrates everything effortlessly — AI booking, encrypted payments, automated reminders, progress intelligence. And the instruction itself is world-class. The most sophisticated driving academy in Metro Vancouver, unequivocally.",
      },
    ],
  };

  return (
      <html lang="en-CA" data-scroll-behavior="smooth">
        <head>
          <link rel="alternate" hrefLang="en-CA" href={baseUrl} />
        </head>
      <body className={`${outfit.variable} ${spaceMono.variable} min-h-full flex flex-col overflow-x-hidden w-full font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:font-semibold focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <VoiceAssistant />
      </body>
    </html>
  );
}