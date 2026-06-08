import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Service Areas — Surrey, Langley & Beyond",
  description: "RYDAX Driving School covers Surrey, Langley, Delta, Richmond, Burnaby, and New Westminster. Free pickup in all areas. Book online and learn with local ICBC-certified instructors.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}