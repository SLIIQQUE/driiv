"use client";

import { motion } from "motion/react";
import { Car, Shield, CheckCircle } from "lucide-react";

function FloatingOrb({ className, delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function HeroCard() {
  return (
    <div className="lg:col-span-5 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          className="relative aspect-square"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/20 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />

            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <motion.div
                  className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center shadow-lg shadow-accent/30"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Car className="w-10 h-10 text-primary" />
                </motion.div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white leading-none">CLASS 5/7</div>
                  <div className="text-accent font-bold uppercase tracking-widest text-xs mt-1">Road Test Specialist</div>
                </div>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="glass-card p-6 border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div
                      className="w-2 h-10 bg-accent rounded-full"
                      animate={{ height: [30, 50, 30] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div>
                      <div className="text-white font-bold">Today&apos;s Session</div>
                      <div className="text-white/40 text-xs">Surrey Training Center</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-xs text-white/60">08:00 AM - 10:00 AM</div>
                    <motion.div
                      className="text-accent flex items-center gap-1 text-sm font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle className="w-4 h-4" /> Confirmed
                    </motion.div>
                  </div>
                </motion.div>

                <div className="flex gap-4">
                  {[
                    { value: "5+", label: "Years Of Mastery" },
                    { value: "1k+", label: "Students Trained" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 glass-card p-4 text-center border-white/5"
                      whileHover={{ scale: 1.05, y: -4 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <motion.div
                        className="text-2xl font-black text-white"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <FloatingOrb className="absolute -top-10 -right-10 w-28 h-28 glass-card rounded-full border-accent/30 flex items-center justify-center text-accent shadow-xl">
            <Shield className="w-10 h-10" />
          </FloatingOrb>

          <FloatingOrb className="absolute -bottom-8 -left-12 px-6 py-4 glass-card border-white/20 rounded-2xl flex items-center gap-3 backdrop-blur-2xl shadow-xl" delay={1}>
            <motion.div
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-bold text-white uppercase tracking-widest whitespace-nowrap">ICBC Approved</span>
          </FloatingOrb>
        </motion.div>
      </motion.div>
    </div>
  );
}
