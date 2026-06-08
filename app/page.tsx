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
      <h1 className="sr-only">Premier Driving School in Surrey & Langley — ICBC Road Test Prep</h1>
      <Hero />
      <FeatureStrip />
      <ServicesSection />
      <AboutPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
