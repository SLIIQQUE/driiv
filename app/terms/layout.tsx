import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | RYDAX",
  description: "Terms and conditions for RYDAX Driving School services. Booking policies, cancellation terms, liability, and student responsibilities.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}