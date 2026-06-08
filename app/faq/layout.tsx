import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Driving School FAQ Surrey — ICBC, Lessons & Pricing",
  description: "Answers to common questions about driving lessons in Surrey: ICBC road test booking, lesson requirements, pricing, service areas, and cancellation policies at RyDax.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}