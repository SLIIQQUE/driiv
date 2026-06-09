import { PageHero, PageTitle, PageDescription, ParallaxBackground } from "@/components/ui";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutValuesSection } from "@/components/about/AboutValuesSection";
import { AboutMilestones } from "@/components/about/AboutMilestones";
import { AboutIncludes } from "@/components/about/AboutIncludes";
import { AboutCTA } from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden flex flex-col gap-10">
      <section className="mb-20 lg:mb-32 relative">
        <ParallaxBackground />

        <div className="container">
          <div className="max-w-4xl relative z-10">
            <PageHero label="Our Philosophy" />

            <h1 className="sr-only">
              About RyDax — Surrey&rsquo;s Trusted Driving School Since 2024
            </h1>
            <PageTitle>
              Sophisticated <br />
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
                driver education.
              </span>
              <br />
              No compromises.
            </PageTitle>

            <PageDescription>
              We engineered RYDAX to demonstrate that learning to drive can be
              seamless, transparent, and stress-free — without sacrificing a
              milligram of instructional quality.
            </PageDescription>
          </div>
        </div>
      </section>

      <AboutStats />
      <AboutValuesSection />
      <AboutMilestones />
      <AboutIncludes />
      <AboutCTA />
    </main>
  );
}
