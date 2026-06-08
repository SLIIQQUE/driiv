import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | RYDAX",
  description: "RYDAX Driving School privacy policy — how we collect, use, and protect your personal data. GDPR-compliant and transparent about your rights.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}