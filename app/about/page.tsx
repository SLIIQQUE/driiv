"use client";

import { useScroll, useTransform } from "motion/react";
import { motion } from "motion/react";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutValuesSection } from "@/components/about/AboutValuesSection";
import { AboutMilestones } from "@/components/about/AboutMilestones";
import { AboutIncludes } from "@/components/about/AboutIncludes";
import { AboutCTA } from "@/components/about/AboutCTA";

export default function AboutPage() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <main
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">Meet Your Expert Driving Instructors</h1> className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="mb-40 lg:mb-64 relative">
        <motion.div
          className="absolute -top-40 -left-40 w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[160px] pointer-events-none select-none"
          style={{ y: yParallax }}
        />

        <div className="container">
          <div className="max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
            >
              <div className="w-12 h-px bg-accent" />
              Our Philosophy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10"
            >
              Sophisticated <br />
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">driver education.</span>
              <br />
              No compromises.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium"
            >
              We engineered RYDAX to demonstrate that learning to drive can be seamless, transparent, and stress-free — without sacrificing a milligram of instructional quality.
            </motion.p>
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