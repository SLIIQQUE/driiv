"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { CoreValues } from "@/components/about/CoreValues";

export default function AboutPage() {
  return (
    <main className="bg-[#030305]">
      <AboutHero />
      <AboutStory />
      <CoreValues />
    </main>
  );
}