"use client";

import {
  Hero,
  FeatureStrip,
  ServicesSection,
  AboutPreview,
  TestimonialsSection,
  CTASection,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <ServicesSection />
      <AboutPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}