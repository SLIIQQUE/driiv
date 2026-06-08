import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Student Reviews & Testimonials | RYDAX",
  description: "Read real student reviews and testimonials from RYDAX Driving School graduates. See why learners in Surrey and Langley choose us for their driving journey.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}