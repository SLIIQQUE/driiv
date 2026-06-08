import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact RyDax Driving School Surrey",
  description: "Book driving lessons in Surrey, Langley, and Delta. Call, email, or book online. Free pickup available. Get started with RyDax Driving School today.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}