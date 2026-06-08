import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Service Areas \u2014 Surrey, Langley & Beyond | RYDAX",
  description: "RYDAX Driving School serves Surrey, Langley, and surrounding areas. Check if we cover your location and book lessons with local instructors who know the test routes.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}