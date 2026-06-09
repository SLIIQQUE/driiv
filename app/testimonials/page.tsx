import { PageHero, PageTitle, PageDescription, EcosystemGrid, ScrollReveal, CTASection } from "@/components/ui";
import { TestimonialsGridSection } from "@/components/testimonials/TestimonialsGridSection";

export default function TestimonialsPage() {
  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <PageHero label="Social Proof" />

          <h1 className="sr-only">
            Student Reviews — RyDax Driving School Surrey BC
          </h1>
          <PageTitle>
            Over a thousand <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">
              success narratives.
            </span>
          </PageTitle>

          <PageDescription className="my-10">
            Our students consistently highlight the seamless orchestration. AI
            booking, online payments, automated reminders, and progress
            intelligence — all converging so you can concentrate on the road.
          </PageDescription>
        </div>
      </section>

      <TestimonialsGridSection />

      <section className="container">
        <ScrollReveal className="glass-card border-white/5 p-10 lg:p-16 rounded-[3rem] relative overflow-hidden mb-20">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full" />
          <div className="text-center mb-8 relative z-10">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">
              Every student experiences
            </h3>
          </div>
          <EcosystemGrid />
        </ScrollReveal>
      </section>

      <CTASection
        title={
          <>
            Author Your{" "}
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
              Success Narrative.
            </span>
          </>
        }
        description="Join over 1,000 students who experienced sophisticated driver education. Book online in under sixty seconds."
        buttonText="Begin Your Journey"
      />
    </main>
  );
}
