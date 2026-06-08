"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturesCTA() {
  return (
    <section className="container">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="premium-card p-12 lg:p-24 text-center relative overflow-hidden bg-accent/5"
      >
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
            Experience <br />
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">seamless driver education.</span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto mb-12 font-medium">
            Book your inaugural session in under sixty seconds. AI-powered, pay online, track everything.
          </p>
          <Link
            href="/contact"
            className="group relative px-12 py-6 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest overflow-hidden shadow-2xl shadow-accent/20 inline-flex items-center gap-3"
          >
            <span className="relative z-10 flex items-center gap-3">
              Book a Session <ArrowRight className="w-5 h-5" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
