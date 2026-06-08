"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="premium-card border-white/5 p-12 lg:p-20 rounded-[4rem] relative overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-primary/10" />
          <motion.div
            className="relative z-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.95]">
              Ready to experience <br />
              <span className="text-accent">sophisticated driver education?</span>
            </h2>
            <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto">
              Book your inaugural session in under sixty seconds. AI-powered, pay online, track everything.
            </p>
            <Link
              href="/booking"
              className="group relative px-16 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden shadow-2xl shadow-accent/20 inline-flex items-center gap-3"
            >
              <span className="relative z-10 flex items-center gap-3">
                Book a Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
