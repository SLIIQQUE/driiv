import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VoiceAssistantWrapper from "@/components/VoiceAssistantWrapper";
import { BookingProvider } from "@/contexts/BookingContext";
import BookingSidesheet from "@/components/booking/BookingSidesheet";
import { testimonials } from "@/data/testimonials";
import { BASE_URL } from "@/lib/config";

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


export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
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
    url: BASE_URL,
    siteName: "RyDax Driving School",
    title: "RyDax Driving School Surrey — ICBC Road Test Prep",
    description:
      "RyDax Driving School in Surrey BC. Expert driving lessons in Rosedale. ICBC road test prep, beginner & advanced packages. Book your first lesson today.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
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
    images: [`${BASE_URL}/og-image.png`],
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
    "@id": `${BASE_URL}/#drivingschool`,
    name: "RYDAX",
    description:
      "Modern AI-powered driving school in Surrey, BC. Online booking, automated reminders, and ICBC licensed instruction.",
    url: BASE_URL,
    telephone: "+16041234567",
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
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: t.body,
    })),
  };

  return (
      <html lang="en-CA" data-scroll-behavior="smooth">
        <head>
          <link rel="alternate" hrefLang="en-CA" href={BASE_URL} />
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
              "@id": `${BASE_URL}/#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
                { "@type": "ListItem", position: 2, name: "Pricing", item: `${BASE_URL}/pricing` },
                { "@type": "ListItem", position: 3, name: "Service Areas", item: `${BASE_URL}/areas` },
                { "@type": "ListItem", position: 4, name: "About", item: `${BASE_URL}/about` },
                { "@type": "ListItem", position: 5, name: "Reviews", item: `${BASE_URL}/testimonials` },
                { "@type": "ListItem", position: 6, name: "FAQ", item: `${BASE_URL}/faq` },
                { "@type": "ListItem", position: 7, name: "Contact", item: `${BASE_URL}/contact` },
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
        <BookingProvider>
          <Navigation />
          <main id="main-content" className="flex-1 w-full overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <VoiceAssistantWrapper />
          <BookingSidesheet />
        </BookingProvider>
      </body>
    </html>
  );
}