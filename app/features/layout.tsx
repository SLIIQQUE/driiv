import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Why Choose DRIIV Driving School Surrey",
  description: "See what makes DRIIV different: 95% first-attempt pass rate, ICBC-certified instructors, dual-control vehicles, AI-powered booking, and free pickup across Surrey & Langley.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}