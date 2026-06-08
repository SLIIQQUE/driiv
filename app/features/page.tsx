"use client";

import { PageHero, PageTitle, PageDescription } from "@/components/ui";
import { FeatureSteps } from "@/components/features/FeatureSteps";
import { FeatureCards } from "@/components/features/FeatureCards";
import { TestimonialShowcase } from "@/components/features/TestimonialShowcase";
import { FeaturesCTA } from "@/components/features/FeaturesCTA";

export default function WhyRydaxPage() {
  return (
    <main
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">Modern AI-Powered Driving Education</h1> className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <PageHero label="The Ecosystem" title={[]} highlight="" description="" />
          <PageTitle>
            Seamless <br />
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">driver education.</span>
            <br />
            Fully orchestrated.
          </PageTitle>
          <PageDescription>
            AI concierge, online payments, automated pulses, and progress intelligence — all converging so you never need to pick up a telephone.
          </PageDescription>
        </div>
      </section>

      <FeatureSteps />
      <FeatureCards />
      <TestimonialShowcase />
      <FeaturesCTA />
    </main>
  );
}