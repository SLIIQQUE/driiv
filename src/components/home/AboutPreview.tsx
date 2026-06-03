"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Award, Users, Star, Shield, MapPin, CheckCircle } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="section bg-[#030305] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-xs mb-4"
          >
            <div className="w-10 h-px bg-accent" />
            The Studio Standard
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white leading-tight"
          >
            Setting the Pace in <br />
            <span className="text-secondary-foreground">Driving Excellence.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
          
          {/* Main Story Block */}
          <motion.div 
            className="md:col-span-8 md:row-span-2 group relative rounded-[2.5rem] bg-linear-to-br from-white/5 to-transparent border border-white/10 p-10 lg:p-14 overflow-hidden flex flex-col justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-primary">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-white">ICBC Licensed Elite</h3>
                   <p className="text-accent text-sm font-medium uppercase tracking-wider">Surrey & Lower Mainland</p>
                </div>
              </div>
              <p className="text-xl text-white/50 leading-relaxed max-w-2xl mb-8">
                Rydax brings a decade of combined experience to the road. Our methodology isn&apos;t just about preparing for a test—it&apos;s about building instinctive safety and absolute road confidence.
              </p>
              <Link href="/about" className="inline-flex items-center gap-3 text-white font-bold group-hover:text-accent transition-colors">
                Read Our Full Story <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            {/* Background Glow */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 blur-[100px] group-hover:bg-accent/20 transition-all duration-700" />
          </motion.div>

          {/* Stats Block - Pass Rate */}
          <motion.div 
            className="md:col-span-4 md:row-span-1 premium-card group rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Star className="w-10 h-10 text-accent mb-4 group-hover:scale-125 transition-transform duration-500" />
            <div className="text-5xl font-black text-white mb-2">95%</div>
            <div className="text-sm font-bold text-white/40 uppercase tracking-widest">Road Test Pass Rate</div>
          </motion.div>

          {/* Stats Block - Students */}
          <motion.div 
            className="md:col-span-4 md:row-span-1 glass-card border-white/5 group rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Users className="w-10 h-10 text-secondary-foreground mb-4 group-hover:scale-110 transition-transform duration-500" />
            <div className="text-5xl font-black text-white mb-2">1K+</div>
            <div className="text-sm font-bold text-white/40 uppercase tracking-widest">Successful Drivers</div>
          </motion.div>

          {/* Feature Block - Safety */}
          <motion.div 
            className="md:col-span-4 md:row-span-1 glass-card border-white/5 rounded-[2.5rem] p-8 overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-4 items-start">
               <CheckCircle className="w-6 h-6 text-accent shrink-0" />
               <div>
                  <h4 className="text-white font-bold mb-2">Dual Control Safety</h4>
                  <p className="text-sm text-white/40">State-of-the-art vehicles equipped for maximum safety during training.</p>
               </div>
            </div>
          </motion.div>

          {/* Feature Block - Location */}
          <motion.div 
            className="md:col-span-4 md:row-span-1 glass-card border-white/5 rounded-[2.5rem] p-8 overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-4 items-start">
               <MapPin className="w-6 h-6 text-white shrink-0" />
               <div>
                  <h4 className="text-white font-bold mb-2">Wide Coverage</h4>
                  <p className="text-sm text-white/40">Serving Surrey, Delta, Langley and throughout the Lower Mainland.</p>
               </div>
            </div>
          </motion.div>

          {/* Experience Block */}
          <motion.div 
            className="md:col-span-4 md:row-span-1 bg-accent rounded-[2.5rem] p-10 flex flex-col justify-center shadow-2xl shadow-accent/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-primary font-black text-6xl leading-none">5+</div>
            <div className="text-primary/70 font-bold uppercase tracking-widest text-xs mt-2">Years of Excellence</div>
            <Link href="/contact" className="mt-6 w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-accent transition-all">
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
