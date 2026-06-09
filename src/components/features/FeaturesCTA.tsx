import { CTASection } from "@/components/ui";

export function FeaturesCTA() {
  return (
    <CTASection
      title={
        <>
          Experience <br />
          <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">seamless driver education.</span>
        </>
      }
      description="Book your inaugural session in under sixty seconds. AI-powered, pay online, track everything."
    />
  );
}
