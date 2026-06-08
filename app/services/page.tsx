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
  Bot,
  Bell,
  BarChart3,
  CreditCard,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const services = [
  {
    id: "foundation",
    icon: Car,
    title: "The Foundation",
    subtitle: "Novice to Navigator",
    tagline: "Where every driver begins",
    description:
      "Zero experience is the only prerequisite. Book individual sessions online, pay with cryptographic security, and receive a digital progress narrative after every lesson. Our AI concierge handles the logistics — you focus on mastering the craft.",
    features: [
      "24/7 online booking — instantaneous confirmation",
      "Encrypted payment — card, debit, or e-transfer",
      "Automated pulses before every rendezvous",
      "Digital progress intelligence after each session",
    ],
    price: "$55/hr",
    popular: false,
  },
  {
    id: "intensive",
    icon: Zap,
    title: "The Accelerator",
    subtitle: "Zero to Licensed in 14 Days",
    tagline: "Our most transformative program",
    description:
      "Ten hours of concentrated mastery with priority scheduling, mock examinations with granular scoring, and a private progress nexus. Every tool in our ecosystem — AI booking, automated reminders, progress intelligence — orchestrated for rapid ascension.",
    features: [
      "Priority scheduling — your cadence, locked",
      "Mock examination with surgical score breakdown",
      "Live progress nexus — track every skill",
      "Vehicle provision for ICBC examination",
      "$100 saved versus à la carte pricing",
    ],
    price: "$650",
    popular: true,
  },
  {
    id: "test-prep",
    icon: FileCheck,
    title: "The Final Edge",
    subtitle: "Test-Day Dominance",
    tagline: "Precision preparation for your ICBC examination",
    description:
      "Simulated test circuits, nerve-calibrating techniques, and a comprehensive skills audit. Includes vehicle use for your examination day. Book, pay, and track your readiness — all within our ecosystem.",
    features: [
      "Test circuit simulation with objective scoring",
      "Pre-examination skills audit",
      "Vehicle provision for ICBC road test",
      "Reminders synced to your preparation milestones",
    ],
    price: "$350",
    popular: false,
  },
  {
    id: "refresher",
    icon: Shield,
    title: "The Polisher",
    subtitle: "Reclaim Your Confidence",
    tagline: "Return with renewed mastery",
    description:
      "Already licensed but the road feels foreign? Book individual sessions — no commitment, no package pressure. Highway, nocturnal, and adverse-condition training. Pay per session, track your resurrection in real time.",
    features: [
      "Individual sessions — no package obligation",
      "Highway integration & nocturnal navigation",
      "Online payment with instantaneous receipt",
      "SMS pulses before every appointment",
    ],
    price: "$55/hr",
    popular: false,
  },
];

export default function ServicesPage() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.6, 1, 1, 0.6]);

  return (
    <main
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">Professional Driving Lessons & ICBC Test Prep</h1> className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-40 lg:mb-64 relative">
        <motion.div
          className="absolute -top-40 -left-40 w-[80vw] h-[80vw] bg-accent/5 rounded-full blur-[160px] pointer-events-none select-none"
          style={{ y: yParallax }}
        />

        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            The Programs
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10"
          >
            Select your <br />
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">trajectory.</span>
            <br />
            We engineer the rest.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium"
          >
            Every program integrates our complete ecosystem: AI-powered booking, encrypted payments, automated reminders, and real-time progress intelligence — orchestrated seamlessly from first click to license in hand.
          </motion.p>
        </div>
      </section>

      <section ref={sectionRef} className="container">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" style={{ opacity }}>
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`premium-card p-10 lg:p-12 relative flex flex-col group overflow-hidden cursor-default ${service.popular ? "border-accent/30 bg-accent/[0.02]" : ""}`}
            >
              {service.popular && (
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-6 right-6 px-4 py-1.5 bg-accent text-primary text-[10px] font-black uppercase tracking-widest rounded-full z-10 shadow-lg shadow-accent/20"
                >
                  Most Popular
                </motion.div>
              )}

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <service.icon className="w-8 h-8 text-accent" />
                  </motion.div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Investment</div>
                    <div className="text-3xl font-black text-white">{service.price}</div>
                  </div>
                </div>

                <div className="mb-auto">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-accent/60 mb-1">{service.tagline}</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-accent mb-3">{service.subtitle}</div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter mb-6">{service.title}</h3>
                  <p className="text-lg text-white/50 leading-relaxed font-medium mb-10 max-w-lg">{service.description}</p>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  {service.features.map((feature, j) => (
                    <motion.div
                      key={j}
                      className="flex items-center gap-3 text-sm font-bold text-white/60"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      {feature}
                    </motion.div>
                  ))}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-6 text-accent font-black uppercase tracking-widest text-xs hover:underline group/link"
                  >
                    <span>Enroll in {service.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass-card border-white/5 p-10 lg:p-16 rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-primary/5" />
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Every program includes</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              {[
                { icon: Bot, label: "AI Concierge", sub: "Book & inquire 24/7" },
                { icon: CreditCard, label: "Secure Pay", sub: "Online, cashless" },
                { icon: Bell, label: "Auto-Reminders", sub: "SMS & email pulses" },
                { icon: BarChart3, label: "Progress Intel", sub: "After every session" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <item.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                  <div className="text-sm font-black uppercase tracking-wider">{item.label}</div>
                  <div className="text-[11px] text-white/30 font-bold">{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card border-white/5 p-12 lg:p-20 rounded-[4rem] relative overflow-hidden backdrop-blur-3xl"
        >
          <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-primary/5" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10 text-center">
            {[
              { icon: Award, stat: "95%", label: "First-Attempt Pass Rate" },
              { icon: Users, stat: "1.2K+", label: "Certified Graduates" },
              { icon: Shield, stat: "100%", label: "Licensed & Insured" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <stat.icon className="w-12 h-12 text-accent mx-auto mb-6" />
                <motion.div
                  className="text-5xl font-black text-white mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {stat.stat}
                </motion.div>
                <div className="text-sm font-black uppercase tracking-widest text-accent mb-4">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}