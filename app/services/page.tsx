"use client";

import { motion, useScroll, useTransform } from "motion/react";
import {
  Car,
  Shield,
  FileCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "beginner",
    icon: Car,
    title: "Foundation Training",
    subtitle: "Complete Beginner to Class 7",
    description:
      "Our signature curriculum for new drivers. We don't just teach you to pass; we teach you to master the road with intuition and safety.",
    features: [
      "Zero-Experience Friendly",
      "Anxiety-Reduction Coaching",
      "ICBC Knowledge Prep",
    ],
    price: "$55",
    size: "large",
    color: "from-accent/20 to-transparent",
  },
  {
    id: "intensive",
    icon: Zap,
    title: "Elite Intensive",
    subtitle: "Fast-Track Certification",
    description:
      "Compressed mastery for those who need their license yesterday. 10 hours of high-impact instruction.",
    features: [
      "2-Week Completion",
      "Priority Scheduling",
      "Mock Test Included",
    ],
    price: "$650",
    size: "medium",
    color: "from-secondary-foreground/20 to-transparent",
  },
  {
    id: "test-prep",
    icon: FileCheck,
    title: "Road Test Mastery",
    subtitle: "Class 5 & 7 Readiness",
    description:
      "Precision-engineered preparation to ensure you pass your ICBC road test on the first attempt.",
    features: [
      "Test Route Simulation",
      "Nerve Management",
      "Final Shield Audit",
    ],
    price: "$350",
    size: "medium",
    color: "from-primary/20 to-transparent",
  },
  {
    id: "refresher",
    icon: Shield,
    title: "Refresher Studio",
    subtitle: "License Reclamation",
    description:
      "Returning to the wheel? Rebuild your confidence and update your skills for modern traffic demands.",
    features: [
      "Highway Confidence",
      "Parking Precision",
      "Night-Driving Option",
    ],
    price: "$55",
    size: "small",
    color: "from-white/5 to-transparent",
  },
];

export default function ServicesPage() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      {/* Cinematic Header */}
      <section className="container mb-40 lg:mb-64 relative">
        <motion.div
          className="absolute -top-40 -left-40 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[160px] pointer-events-none select-none"
          style={{ y: yParallax }}
        />

        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            The Curriculum
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
            Professional <br />
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
              Instruction.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium">
            Tailored driving programs in Surrey, BC. From nervous beginners to
            advanced license seekers, we build world-class road confidence.
          </p>
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Grid Services */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-10 lg:p-12 relative flex flex-col group overflow-hidden"
            >
              {/* Card Decor */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 bg-linear-to-br ${service.color} blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black uppercase tracking-widest text-white/30 mb-1">
                      Starting From
                    </div>
                    <div className="text-3xl font-black text-white">
                      {service.price}
                    </div>
                  </div>
                </div>

                <div className="mb-auto">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-accent mb-3">
                    {service.subtitle}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter mb-6">
                    {service.title}
                  </h3>
                  <p className="text-lg text-white/50 leading-relaxed font-medium mb-10 max-w-lg">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  {service.features.map((feature, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 text-sm font-bold text-white/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      {feature}
                    </div>
                  ))}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-8 text-accent font-black uppercase tracking-widest text-xs hover:underline group/link"
                  >
                    Book This Program{" "}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Trust Stats Section */}
      <section className="container">
        <div className="glass-card border-white/5 p-12 lg:p-20 rounded-[4rem] relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-primary/5" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10 text-center">
            {[
              {
                icon: Award,
                stat: "95%",
                label: "First-Time pass rate",
                desc: "Our methodology is built for consistency.",
              },
              {
                icon: Users,
                stat: "1.2K+",
                label: "Certified Learners",
                desc: "A decade of successful graduates in BC.",
              },
              {
                icon: Shield,
                stat: "100%",
                label: "Licensed & Insured",
                desc: "ICBC Bonded for ultimate peace of mind.",
              },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <stat.icon className="w-12 h-12 text-accent mb-6" />
                <div className="text-5xl font-black text-white mb-2">
                  {stat.stat}
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-accent mb-4">
                  {stat.label}
                </div>
                <p className="text-white/40 font-medium leading-relaxed max-w-xs">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
