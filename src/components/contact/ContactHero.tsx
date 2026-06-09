"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Bot, Car } from "lucide-react";
import BookNowTrigger from "@/components/BookNowTrigger";
import { PageHero, PageTitle, PageDescription } from "@/components/ui";

export function ContactHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-[#030305] pt-32 pb-32 lg:pb-48">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] bg-accent/5 rounded-full blur-[150px]"
          style={{ y }}
        />
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl">
          <PageHero label="Get In Touch" />

          <PageTitle>
            We&apos;re here <br />
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">to help.</span>
          </PageTitle>

          <PageDescription>
            Reach out anytime. Our team responds within hours, not days.
          </PageDescription>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-6 items-center mt-10"
          >
            <BookNowTrigger className="group relative px-10 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden shadow-2xl shadow-accent/20">
              <span className="relative z-10 flex items-center gap-3">
                Book Online <Car className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </BookNowTrigger>
            <span className="flex items-center gap-2 text-sm text-white/40 font-bold">
              <Bot className="w-4 h-4 text-accent" /> AI Concierge 24/7
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
