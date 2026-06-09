"use client";

import { useScroll, useTransform } from "motion/react";
import { motion } from "motion/react";
import { PageHero, PageTitle, PageDescription } from "@/components/ui";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutValuesSection } from "@/components/about/AboutValuesSection";
import { AboutMilestones } from "@/components/about/AboutMilestones";
import { AboutIncludes } from "@/components/about/AboutIncludes";
import { AboutCTA } from "@/components/about/AboutCTA";

export default function AboutPage() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden flex flex-col gap-10">
      <section className="mb-20 lg:mb-32 relative">
        <motion.div
          className="absolute -top-40 -left-40 w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[160px] pointer-events-none select-none"
          style={{ y: yParallax }}
        />

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
