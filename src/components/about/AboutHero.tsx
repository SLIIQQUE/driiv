"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Award, Shield, CheckCircle, GraduationCap } from "lucide-react";

export function AboutHero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#030305] pt-20 lg:pt-32">
      {/* Background Layer with Parallax Text */}
      <motion.div 
        className="absolute inset-0 z-0 select-none pointer-events-none opacity-[0.03] flex items-center justify-center whitespace-nowrap"
        style={{ y: yParallax }}
      >
        <span className="text-[40vw] font-black leading-none tracking-tighter">EXPERT</span>
      </motion.div>

      {/* Decorative Orbs */}
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
              <GraduationCap className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold uppercase tracking-widest text-accent">ICBC Certified Specialist</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
              The Mind <br />
              Behind <br />
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">The Wheel.</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/50 max-w-xl leading-relaxed mb-12">
              Meet Kerry Hare—Surrey&apos;s leading driving educator. With a decade of road mastery, she transforms anxiety into absolute automotive confidence.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { label: "Experience", value: "10+ Yrs" },
                { label: "Pass Rate", value: "95%" },
                { label: "Students", value: "1K+" },
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
            {/* 3D Composition Placeholder */}
            <div className="absolute inset-0 premium-card border-none rounded-[4rem] overflow-hidden">
               <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-transparent to-primary/20" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                  {/* Symbolizing the instructor / driving theme */}
                  <Shield className="w-64 h-64 text-white/10" />
               </div>
            </div>
            
            {/* Floating Glass Badges */}
            <motion.div 
               className="absolute top-10 -right-8 glass-card p-6 rounded-3xl"
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
               <Award className="w-10 h-10 text-accent mb-2" />
               <div className="text-sm font-bold text-white uppercase tracking-wider">Top Rated 2024</div>
            </motion.div>

            <motion.div 
               className="absolute bottom-20 -left-12 glass-card p-8 rounded-3xl"
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
               <CheckCircle className="w-12 h-12 text-secondary-foreground mb-2" />
               <div className="text-sm font-bold text-white uppercase tracking-wider">Pass First Time</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
