import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VoiceAssistantWrapper from "@/components/VoiceAssistantWrapper";

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

const baseUrl = "https://rydax.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
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
  manifest: "/site.webmanifest",
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
  // TODO: Replace with actual Google Search Console verification code
  // verification: { google: "..." },
  other: {
    "theme-color": "#1A2B48",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "RyDax",
    "msapplication-TileColor": "#1A2B48",
    "msapplication-config": "/browserconfig.xml",
    "revisit-after": "7 days",
    "geo.position": "49.1272748;-122.8740839",
    "geo.placename": "Surrey",
    "geo.region": "CA-BC",
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
    telephone: "+2348103413970",
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
      reviewCount: 6,
      bestRating: 5,
      worstRating: 1,
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
          "I booked my first session online late at night and got confirmation instantly. The automatic reminders meant I never forgot a lesson. After each session, the progress dashboard showed exactly where I was improving. Passed my Class 7 on the first try. Everything worked seamlessly.",
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
          "I had zero experience and passed my test in just a few weeks. The online booking was straightforward, and the AI chat answered all my questions instantly. Paying online, getting reminders before each lesson, and seeing my progress after every session made the whole process stress-free.",
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
          "I failed my road test twice with other schools. RyDax identified my weak spots and fixed them in just three sessions. Being able to book online, pay by card, and see my progress after each lesson took all the uncertainty out of the process. I finally passed with confidence.",
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
          "Everything was online — booking, payment, tracking — all from my phone. I never had to write a cheque or wait on hold. The AI assistant answered my questions at midnight. This is how driving school should work when it's designed around the student's convenience.",
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
          "The best part was not having to make phone calls. Everything was online — booking, payment, reminders. The progress tracking after each session was surprisingly detailed. I watched my scores improve from 60% to 95% over eight lessons and passed my test with ease.",
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
          "I looked at a few driving schools before choosing RyDax and I'm glad I did. The online system handles everything — booking, payments, reminders — and the instruction quality is excellent. The most professional driving school I've experienced in Metro Vancouver.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": `${baseUrl}/#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
                { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
                { "@type": "ListItem", position: 3, name: "Pricing", item: `${baseUrl}/pricing` },
                { "@type": "ListItem", position: 4, name: "Service Areas", item: `${baseUrl}/areas` },
                { "@type": "ListItem", position: 5, name: "About", item: `${baseUrl}/about` },
                { "@type": "ListItem", position: 6, name: "FAQ", item: `${baseUrl}/faq` },
                { "@type": "ListItem", position: 7, name: "Contact", item: `${baseUrl}/contact` },
              ],
            }),
          }}
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
          <VoiceAssistantWrapper />
      </body>
    </html>
  );
}