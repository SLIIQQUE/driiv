import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "RyDax Driving School privacy policy — how we collect, use, and protect your personal information in compliance with PIPEDA. Surrey BC driving school privacy practices.",
}

// TODO: T5-optimise

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}