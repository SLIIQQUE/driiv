"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Car } from "lucide-react";
import BookNowTrigger from "@/components/BookNowTrigger";

const navigation = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Book Now", href: "/?book=1" },
    { name: "Features", href: "/features" },
    { name: "Areas Covered", href: "/areas" },
    { name: "Reviews", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

function FloatingOrb({
  color,
  size,
  initialX,
  initialY,
  driftIntensity = 1,
}: {
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  driftIntensity?: number;
}) {
  const duration = 20 / driftIntensity;

  return (
    <div
      className="absolute rounded-full blur-[120px] pointer-events-none animate-float-orb"
      style={{
        width: size,
        height: size,
        background: color,
        left: initialX,
        top: initialY,
        animationDuration: `${duration}s`,
        willChange: "transform",
      }}
      />
  );
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const orbsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.6, 0.6, 0.2]);

  return (
    <footer
      ref={sectionRef}
      className="relative bg-[#030305] text-white overflow-hidden pt-20 lg:pt-32 pb-6"
    >
      {/* Floating orbs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: orbsOpacity }}>
        <FloatingOrb
          color="linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.05))"
          size={500}
          initialX={-100}
          initialY={100}
          driftIntensity={0.8}
        />
        <FloatingOrb
          color="linear-gradient(135deg, rgba(120,80,255,0.1), rgba(120,80,255,0.03))"
          size={400}
          initialX={800}
          initialY={-50}
          driftIntensity={1.2}
        />
        <FloatingOrb
          color="linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,180,0,0.02))"
          size={350}
          initialX={400}
          initialY={300}
          driftIntensity={1.0}
        />
      </motion.div>

      {/* Dot grid texture */}
      <div className="absolute inset-0 grid-pattern opacity-[0.015] pointer-events-none" />

      {/* Animated top border shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-[border-shimmer_3s_ease-in-out_infinite]" />
      </div>

      {/* RYDAX watermark */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center"
        style={{ y: watermarkParallax }}
      >
        <span
          className="font-display text-[18vw] lg:text-[22vw] font-bold leading-none tracking-tighter bg-gradient-to-r from-white/0 via-accent/15 via-30% to-white/0 bg-[length:200%_100%] bg-clip-text text-transparent animate-[watermark-shine_8s_ease-in-out_infinite]"
        >
          RYDAX
        </span>
      </motion.div>

      <div className="container relative z-10">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-white/5">
          {/* Left — Brand */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-accent via-primary-light to-primary rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <Car className="w-7 h-7 text-black" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary-light to-primary rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-gradient-premium tracking-tight">
                  RYDAX
                </span>
              </div>
            </Link>
            <p className="text-sm leading-7 text-white/50 max-w-md mb-8">
              Surrey&apos;s most advanced driving school. AI-powered booking, automated reminders, and ICBC licensed instruction. Learn to drive with confidence.
            </p>

            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
              <Car className="w-3 h-3 text-accent/60" /> ICBC Licensed {'\u2022'} Fully Insured
            </div>
          </motion.div>

          {/* Right — Nav columns */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {(["quickLinks", "company"] as const).map((section, sectionIdx) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  delay: 0.1 + sectionIdx * 0.15,
                }}
              >
                <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] mb-6">
                  {section === "quickLinks" ? "Quick Links" : "Company"}
                </h3>
                <ul role="list" className="space-y-3">
                  {navigation[section].map((item) => (
                    <li key={item.name}>
                      {item.name === "Book Now" ? (
                        <BookNowTrigger className="text-sm text-white/40 hover:text-accent transition-colors flex items-center gap-2 group w-full text-left">
                          <span className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
                            <ArrowRight className="w-2.5 h-2.5 text-accent/0 group-hover:text-accent transition-all duration-300" />
                          </span>
                          {item.name}
                        </BookNowTrigger>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-sm text-white/40 hover:text-accent transition-colors flex items-center gap-2 group"
                        >
                          <span className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
                            <ArrowRight className="w-2.5 h-2.5 text-accent/0 group-hover:text-accent transition-all duration-300" />
                          </span>
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Copyright bar */}
        <motion.div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xs text-white/20 font-medium">
            {'\u00A9'} {new Date().getFullYear()} RYDAX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { name: "Privacy", href: "/privacy" },
              { name: "Terms", href: "/terms" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-white/20 hover:text-accent/60 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
