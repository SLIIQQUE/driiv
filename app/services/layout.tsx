import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Driving Lessons & Services | RYDAX",
  description: "Professional driving lessons and services in Surrey and Langley. Expert instructors, flexible scheduling, and proven results for new and experienced drivers.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}