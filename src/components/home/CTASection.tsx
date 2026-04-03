"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Phone, Calendar, Shield, Award, CheckCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section bg-[#030305] relative overflow-hidden">
      {/* Background Decorative Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,215,0,0.05),transparent_50%)]" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="glass-card border-white/10 rounded-[3rem] p-10 lg:p-20 overflow-hidden relative">
          {/* Accent Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-widest text-xs mb-6">
                <CheckCircle className="w-5 h-5 animate-pulse" />
                ICBC Licensed Instruction
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-[0.95] mb-8">
                Your Road to <br />
                <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">Independence</span> <br />
                Starts Here.
              </h2>
              <p className="text-xl text-white/50 leading-relaxed max-w-lg mb-12">
                Don&apos;t just dream of driving. Master the skill with Surrey&apos;s most patient and professional instructors. Limited slots available this month.
              </p>

              <div className="flex flex-wrap gap-8 items-center opacity-60">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Fully Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Certified Masters</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 bg-accent rounded-[2.5rem] p-12 lg:p-16 text-primary shadow-2xl shadow-accent/20 flex flex-col items-center text-center">
                <Calendar className="w-16 h-16 mb-8 text-primary/80" />
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Book Your First Lesson</h3>
                <p className="text-primary/70 font-bold mb-10">Available starting tomorrow in Surrey, BC.</p>
                
                <Link href="/contact" className="w-full bg-primary text-accent py-6 rounded-2xl flex items-center justify-center gap-3 text-xl font-black group hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                  SECURE YOUR SLOT <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <div className="mt-8 flex items-center gap-3 py-3 px-6 bg-primary/5 rounded-full border border-primary/10">
                  <Phone className="w-5 h-5 text-primary/60" />
                  <span className="text-sm font-black">OR CALL: 604-XXX-XXXX</span>
                </div>
              </div>

              {/* Decorative Floating Card behind */}
              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-accent/20 rounded-[2.5rem] -z-10" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
