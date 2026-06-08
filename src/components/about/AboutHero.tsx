"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Bot, Shield, TrendingUp, Globe } from "lucide-react";

export function AboutHero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#030305] pt-20 lg:pt-32">
      <motion.div 
        className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.03] flex items-center justify-center whitespace-nowrap"
        style={{ y: yParallax }}
      >
        <span className="text-[40vw] font-black leading-none tracking-tighter">BUILT</span>
      </motion.div>

      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 border border-accent/20 bg-accent/5 rounded-full mb-8 backdrop-blur-xl"
            >
              <Bot className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold uppercase tracking-widest text-accent">Built by SLIIQQUE Studio</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
              Built From <br />
              Real <br />
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">Experience.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-xl leading-relaxed mb-12">
              RYDAX was born inside driving schools. We experienced the phone hell, the cash flow whiplash, and the seasonal panic firsthand. Every feature exists because we lived the pain.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { label: "Schools Served", value: "40+" },
                { label: "Avg. Revenue Lift", value: "+40%" },
                { label: "Countries", value: "3" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-accent uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] lg:h-[700px] hidden md:block"
          >
            <div className="absolute inset-0 premium-card border-none rounded-[4rem] overflow-hidden">
               <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-transparent to-primary/20" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                  <Globe className="w-64 h-64 text-white/10" />
               </div>
            </div>
            
            <motion.div 
               className="absolute top-10 -right-8 glass-card p-6 rounded-3xl"
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
               <TrendingUp className="w-10 h-10 text-accent mb-2" />
               <div className="text-sm font-bold text-white uppercase tracking-wider">40% Avg Growth</div>
            </motion.div>

            <motion.div 
               className="absolute bottom-20 -left-12 glass-card p-8 rounded-3xl"
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
               <Shield className="w-12 h-12 text-secondary-foreground mb-2" />
               <div className="text-sm font-bold text-white uppercase tracking-wider">Enterprise Grade</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}