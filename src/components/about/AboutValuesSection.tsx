"use client";

import { motion } from "motion/react";
import { Target, Zap, Heart, Award, Sparkles } from "lucide-react";

const values = [
  { icon: Target, label: "Safety Obsession", description: "Every session builds defensive reflexes engineered to last." },
  { icon: Zap, label: "Technological Precision", description: "We automate everything except the instruction — where human mastery matters most." },
  { icon: Heart, label: "Student Sovereignty", description: "Custom pacing, zero pressure, radical transparency on your trajectory." },
  { icon: Award, label: "95% Pass Rate", description: "Our methodology ensures most students succeed on their first attempt." },
];

export function AboutValuesSection() {
  return (
    <section className="mb-40 lg:mb-64">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent/70">Our principles</span>
          </motion.div>
          <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95]">
            Our North Stars
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card border-white/5 p-8 text-center group cursor-default hover:border-accent/20 transition-colors"
            >
              <val.icon className="w-10 h-10 text-accent mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-black text-white uppercase mb-2">{val.label}</h3>
              <p className="text-sm text-white/40 font-medium">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
