"use client";

import { motion } from "motion/react";
import { Car, Clock, Shield, MapPin } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "ICBC Licensed Lessons",
    description: "Fully licensed by ICBC to provide Class 5 and Class 7 driving instruction.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Lessons available early mornings, evenings, and weekends to fit your schedule.",
  },
  {
    icon: Shield,
    title: "Road Test Prep",
    description: "Complete preparation for your ICBC road test. We help you pass the first time.",
  },
  {
    icon: MapPin,
    title: "Lower Mainland Coverage",
    description: "Serving Surrey, Langley, Delta, Richmond, and surrounding areas.",
  },
];

export default function FeatureStrip() {
  return (
    <section className="section bg-[#030305] border-y border-white/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="premium-card p-8 text-center group"
            >
              <motion.div
                className="w-16 h-16 bg-linear-to-br from-accent/20 via-primary-light/20 to-primary/20 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <feature.icon className="w-8 h-8 text-accent" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              <motion.div
                className="absolute inset-0 rounded-2xl border border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ transform: "translateZ(-1px)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
