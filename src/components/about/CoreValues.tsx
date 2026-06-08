"use client";

import { motion } from "motion/react";
import { Bot, TrendingUp, Shield, Zap } from "lucide-react";

const values = [
  {
    icon: Bot,
    title: "AI That Actually Works",
    description: "Not a generic chatbot. Our AI is fine-tuned for driving school conversations — bookings, rescheduling, pricing, and payments.",
    color: "from-accent/20 to-transparent"
  },
  {
    icon: TrendingUp,
    title: "Real Revenue Growth",
    description: "Every feature is measured by impact. We don't add fluff — only tools that directly increase bookings, reduce churn, or save time.",
    color: "from-secondary-foreground/20 to-transparent"
  },
  {
    icon: Shield,
    title: "Built for Reliability",
    description: "Your school can't afford downtime. RYDAX runs on enterprise infrastructure with 99.9% uptime and real-time monitoring.",
    color: "from-primary/20 to-transparent"
  },
  {
    icon: Zap,
    title: "30-Day Onboarding",
    description: "From sign-up to live. We handle the technical setup, train your team, and optimize your first campaigns. No complexity, no delays.",
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