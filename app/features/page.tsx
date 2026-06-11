import { PageHero, PageTitle, PageDescription } from "@/components/ui";
import { FeatureSteps } from "@/components/features/FeatureSteps";
import { FeatureCards } from "@/components/features/FeatureCards";
import { TestimonialShowcase } from "@/components/features/TestimonialShowcase";
import { FeaturesCTA } from "@/components/features/FeaturesCTA";

export default function WhyDriivPage() {
  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden flex flex-col gap-10">
      <section className="container mb-20 lg:mb-32 relative">
        <div className="max-w-4xl relative z-10">
          <PageHero label="The Ecosystem" />
          <h1 className="sr-only">
            Why Choose DRIIV Driving School Surrey — Features & Benefits
          </h1>
          <PageTitle>
            Seamless <br />
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
              driver education.
            </span>
            <br />
            Fully orchestrated.
          </PageTitle>
          <PageDescription>
            AI concierge, online payments, automated pulses, and progress
            intelligence — all converging so you never need to pick up a
            telephone.
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
