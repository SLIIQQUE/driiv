import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Driving Lessons Surrey — Packages & Road Test Prep",
  description: "Professional driving lessons and ICBC road test preparation in Surrey and Langley. Flexible packages, expert instructors, modern dual-control fleet. Book online.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}