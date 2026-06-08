import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About RYDAX Driving School | RYDAX",
  description: "Learn about RYDAX Driving School — Surrey and Langley's trusted driving instructors. Our mission, values, and commitment to safe, confident driving.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}