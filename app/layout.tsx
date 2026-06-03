import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import ThemeToggle from "@/components/ThemeToggle";

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

const baseUrl = "https://bhandhdrivingschool.ca";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Rydax School | Driving Lessons in Surrey, BC",
    template: "%s | Rydax School",
  },
  description:
    "Learn to drive with confidence in Surrey, BC. Professional driving lessons in the Lower Mainland. ICBC licensed instructors. Book your first lesson today.",
  keywords: [
    "driving lessons",
    "driving school",
    "Surrey BC",
    "Langley driving lessons",
    "Delta driving school",
    "ICBC driving test",
    "learn to drive",
    "BC driving license",
    "new driver",
  ],
  authors: [{ name: "Rydax School Inc" }],
  creator: "Rydax School",
  publisher: "Rydax School",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: baseUrl,
    siteName: "Rydax School",
    title: "Rydax School | Driving Lessons in Surrey, BC",
    description:
      "Learn to drive with confidence in Surrey, BC. Professional driving lessons in the Lower Mainland.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rydax School | Driving Lessons in Surrey, BC",
    description:
      "Learn to drive with confidence. Professional driving lessons in Surrey, BC.",
  },
  robots: {
    index: true,
    follow: true,
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
    name: "Rydax School Inc",
    description:
      "Learn to drive with confidence in Surrey, BC. Professional driving lessons in the Lower Mainland.",
    url: baseUrl,
    telephone: "+1-604-XXX-XXXX",
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
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
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
        {/* <ThemeToggle /> */}
      </body>
    </html>
  );
}