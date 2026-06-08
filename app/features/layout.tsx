import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Why Choose RYDAX | RYDAX",
  description: "Discover why RYDAX is Surrey and Langley's preferred driving school — expert instructors, flexible lessons, high pass rates, and a student-first approach.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}