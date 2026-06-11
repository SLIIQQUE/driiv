import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for DRIIV Driving School services in Surrey BC. Booking policies, cancellation terms, liability, and student responsibilities.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}