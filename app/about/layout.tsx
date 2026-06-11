import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About DRIIV Driving School Surrey — Local Instructors",
  description: "Meet the team behind DRIIV Driving School in Surrey, BC. ICBC-certified instructors, modern fleet, and a student-first approach. Learn why Surrey learners choose DRIIV.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}