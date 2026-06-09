"use client";

import { motion } from "motion/react";
import { EcosystemGrid } from "@/components/ui";

export function AboutIncludes() {
  return (
    <section>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border-white/5 p-10 lg:p-16 rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full" />
          <div className="text-center mb-10 relative z-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
              Every student receives
            </h3>
          </div>
          <EcosystemGrid />
        </motion.div>
      </div>
    </section>
  );
}
