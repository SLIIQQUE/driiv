"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Car, Clock, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { HeroCard } from "@/components/home/HeroCard";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const yTranslate = useTransform(scrollY, [0, 800], [0, 200]);
  const textScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[105dvh] flex items-center bg-[#030305] overflow-hidden pt-32 pb-40 lg:pb-64"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/5 rounded-full blur-[180px]" />

        <motion.div
          className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #FFD700 0%, transparent 70%)",
            y: useTransform(scrollY, [0, 1000], [0, 150]),
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #1A2B48 0%, transparent 70%)",
            y: useTransform(scrollY, [0, 1000], [0, -100]),
          }}
        />

        <motion.div
          className="absolute -right-20 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03]"
          style={{ y: yTranslate }}
        >
          <span className="text-[30vw] font-black leading-none tracking-tighter text-white">DRIVE</span>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-7 text-left"
            style={{ scale: textScale, opacity: opacityFade }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-accent">
                Surrey&apos;s Most Advanced Driving Academy
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8"
            >
              Elevate Your <br />
              <span className="text-accent">Drive.</span>
              <br />
              Simplify Your Life.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/40 max-w-xl mb-12 leading-relaxed"
            >
              ICBC-licensed mastery meets modern convenience. AI-powered booking, secure payments,
              automated reminders, and real-time progress tracking — all orchestrated seamlessly so
              you can focus on what matters: becoming a confident, skilled driver.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
            >
              <Link
                href="/contact"
                className="group relative px-10 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Book a Lesson <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div className="absolute inset-0 bg-white/20" initial={{ x: "-100%" }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
              </Link>
              <Link
                href="/services"
                className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-sm text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
              >
                Explore Programs
              </Link>
            </motion.div>

            <motion.div
              className="mt-16 flex flex-wrap gap-8 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: Shield, text: "95% Pass Rate" },
                { icon: Car, text: "Dual-Control Cars" },
                { icon: Clock, text: "Flexible Slots" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-bold text-white/50 uppercase tracking-wider">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <HeroCard />
        </div>
      </div>
    </section>
  );
}
