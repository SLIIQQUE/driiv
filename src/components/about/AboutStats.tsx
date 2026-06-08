"use client";

import { motion } from "motion/react";
import { Quote, Car, Users, Shield, MapPin } from "lucide-react";

const stats = [
  { icon: Car, value: "5+", label: "Years In Surrey" },
  { icon: Users, value: "1K+", label: "Students Certified" },
  { icon: Shield, value: "95%", label: "First-Try Pass" },
  { icon: MapPin, value: "6", label: "Cities Covered" },
];

export function AboutStats() {
  return (
    <section className="mb-40 lg:mb-64">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-8"
          >
            <Quote className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">The friction we eliminated</span>
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.95]">
            Driver education <br />
            <span className="text-secondary-foreground">shouldn&apos;t feel archaic.</span>
          </h2>
          <div className="space-y-6 text-white/40 font-medium leading-relaxed text-lg">
            <p>
              Before RYDAX, booking a session meant calling during business hours, leaving a voicemail, and waiting. Payment was cash or cheque. Progress was abstract. Reminders didn&apos;t exist.
            </p>
            <p>
              We replaced every point of friction. AI-powered booking operates 24/7. Payments process with cryptographic security. Automated pulses ensure you never lose a session. Digital intelligence reports after every single session reveal your trajectory with surgical clarity.
            </p>
            <p>
              The outcome? A 95% first-attempt pass rate and over 1,000 students who never once needed to pick up a phone to book a lesson.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="glass-card border-white/5 rounded-[3rem] p-12 lg:p-16 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <div className="grid grid-cols-2 gap-12 text-center relative z-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                  <motion.div
                    className="text-4xl font-black text-white tracking-tighter mb-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
