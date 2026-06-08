import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Driving School FAQs | RYDAX",
  description: "Frequently asked questions about driving lessons, booking, pricing, and requirements at RYDAX Driving School. Get quick answers to common queries.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}