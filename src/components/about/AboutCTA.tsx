import { CTASection } from "@/components/ui";

export function AboutCTA() {
  return (
    <section>
      <div className="container">
        <CTASection
          noContainer
          title={
            <>
              Ready to experience <br />
              <span className="text-accent">sophisticated driver education?</span>
            </>
          }
          description="Book your inaugural session in under sixty seconds. AI-powered, pay online, track everything."
          overlay={<div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-primary/10" />}
          wrapperClassName="bg-accent/5 border-white/5"
        />
      </div>
    </section>
  );
}
