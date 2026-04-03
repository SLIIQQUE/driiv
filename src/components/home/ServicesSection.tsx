"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Star } from "lucide-react";

const services = [
  {
    title: "Standard Lessons",
    description: "One-to-one driving lessons tailored to your skill level. Book individual hours as you need them.",
    price: "From $45/hr",
    icon: Shield,
    features: ["Flexible duration", "Personalised teaching", "Test preparation"],
  },
  {
    title: "Intensive Courses",
    description: "Fast-track your learning with an intensive course. Pass in weeks rather than months.",
    price: "From $550",
    icon: Zap,
    accelerated: true,
    features: ["Accelerated learning", "Structured curriculum", "Mock tests included"],
  },
  {
    title: "Pass Plus",
    description: "Build confidence after passing your test. Learn advanced driving techniques and save on insurance.",
    price: "$250",
    icon: Star,
    features: ["6 modules", "Insurance savings", "Advanced skills"],
  },
];

export default function ServicesSection() {
  return (
    <section className="section bg-[#030305] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-4"
          >
            Our Services
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Driving <span className="text-gradient-premium">Services</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Professional driving instruction tailored to your needs. Whether you're a complete beginner or looking to improve your skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotateX: 5 }}
              className={`premium-card p-8 relative overflow-hidden ${service.accelerated ? "border-accent/30" : ""}`}
            >
              {service.accelerated && (
                <div className="absolute top-0 right-0">
                  <div className="px-4 py-2 bg-gradient-to-r from-accent to-primary-light text-black text-xs font-bold rounded-bl-xl">
                    Most Popular
                  </div>
                </div>
              )}
              
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-accent/20 via-primary-light/20 to-primary/20 rounded-2xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <service.icon className="w-7 h-7 text-accent" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">{service.description}</p>
              
              <div className="text-3xl font-bold text-gradient-premium mb-6">{service.price}</div>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + j * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-sm text-white/50"
                  >
                    <motion.span
                      className="w-2 h-2 bg-gradient-to-r from-accent to-primary-light rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: j * 0.3 }}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <Link
                href="/contact"
                className="btn btn-primary w-full justify-center group"
              >
                <span className="flex items-center gap-2">
                  Book Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn btn-secondary">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
