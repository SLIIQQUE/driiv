import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Student Reviews — RyDax Driving School Surrey",
  description: "Read real reviews from RyDax students in Surrey, Langley, and Delta. 95% ICBC road test pass rate. See why learners recommend our driving lessons.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}