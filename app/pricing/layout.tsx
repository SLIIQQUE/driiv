import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Driving Lesson Prices Surrey — Packages & Rates",
  description: "Transparent driving lesson prices in Surrey and Langley. Pay-as-you-go at $55/hr, 5-session packs from $250, 10-session bundles from $450. No hidden fees.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}