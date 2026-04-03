"use client";

import { motion } from "motion/react";
import { Shield, Target, Heart, Zap } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Our primary objective is to build safe, defensive driving habits that last a lifetime.",
    color: "from-accent/20 to-transparent"
  },
  {
    icon: Target,
    title: "Precision Coaching",
    description: "Every lesson is tailored to your specific needs, focusing on the details that matter.",
    color: "from-secondary-foreground/20 to-transparent"
  },
  {
    icon: Heart,
    title: "Extreme Patience",
    description: "We specialize in nervous drivers, providing a calm and supportive environment.",
    color: "from-primary/20 to-transparent"
  },
  {
    icon: Zap,
    title: "Adaptive Learning",
    description: "Our methodology evolves as you grow, ensuring you're always challenged but never overwhelmed.",
    color: "from-accent/20 to-transparent"
  }
];

export function CoreValues() {
  return (
    <section className="py-24 bg-[#030305]">
      <div className="container overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              className="premium-card p-10 flex flex-col items-center text-center group cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-20 h-20 rounded-3xl bg-linear-to-br ${value.color} border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl`}>
                <value.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{value.title}</h3>
              <p className="text-white/40 leading-relaxed font-medium">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
