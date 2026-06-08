import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About RyDax Driving School Surrey — Local Instructors",
  description: "Meet the team behind RyDax Driving School in Surrey, BC. ICBC-certified instructors, modern fleet, and a student-first approach. Learn why Surrey learners choose RyDax.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}