import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact RYDAX Driving School | RYDAX",
  description: "Get in touch with RYDAX Driving School — Surrey and Langley. Book a lesson, ask a question, or request a callback. We're here to help you start driving.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}