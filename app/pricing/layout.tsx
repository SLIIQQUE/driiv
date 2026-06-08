import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Driving Lesson Prices & Packages | RYDAX",
  description: "Transparent driving lesson pricing and packages for Surrey and Langley. Pay-as-you-go, block bookings, and intensive courses — no hidden fees.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}