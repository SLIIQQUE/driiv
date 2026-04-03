"use client";

import { motion } from "motion/react";
import { Mail, Phone, MessageSquare } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#030305] pt-32 pb-32 lg:pb-48">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Direct Access
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-card border-white/10 rounded-[3rem] p-10 lg:p-20 relative overflow-hidden"
          >
            {/* Inner Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
              Let&apos;s Get <br />
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">Moving.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed mb-12 font-medium">
              Ready to secure your road test? Whether you have questions about our packages or want to book directly, our studio is ready to assist.
            </p>

            <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-white/5">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                     <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-white font-bold tracking-tight">604-XXX-XXXX</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                     <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-white font-bold tracking-tight">hello@bh-driving.ca</span>
               </div>
               <div className="hidden md:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                     <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-white font-bold tracking-tight">Live Chat Ready</span>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}