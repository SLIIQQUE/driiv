"use client";

import { motion } from "motion/react";
import {
  Shield,
  Eye,
  Lock,
  Server,
  Share2,
  Scale,
  Trash2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

const privacySections = [
  {
    icon: Shield,
    title: "Data Protection Strategy",
    content:
      "At RYDAX, your privacy is integral to our safety first philosophy. We use bank-level encryption to safeguard your identification documents, driving records, and contact details.",
  },
  {
    icon: Eye,
    title: "Transparent Collection",
    content:
      "We collect only what's necessary for your ICBC certification: full name, contact information, Learner's License ID, and driving history. We never scrape or shadow-track our users.",
  },
  {
    icon: Lock,
    title: "Access Control",
    content:
      "Your training data is restricted to your primary instructor and our core administrative team. Instructors access your details only during the active training window.",
  },
  {
    icon: Server,
    title: "Local Storage",
    content:
      "Our records are stored on secure, Canadian-based servers that comply with FIPPA and PIPEDA regulations for maximum jurisdictional protection.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      {/* Cinematic Header */}
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-secondary-foreground font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-secondary-foreground" />
            Security Standards
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
            Privacy <br />
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
              Protocol.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium">
            How we protect your identity, driving history, and personal data in
            the digital and physical driving space.
          </p>
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Modern Grid of Privacy pillars */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-32">
          {privacySections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card border-white/5 p-10 lg:p-14 rounded-[3.5rem] relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full group-hover:bg-accent/10 transition-colors" />
              <section.icon className="w-10 h-10 text-accent mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
                {section.title}
              </h3>
              <p className="text-lg text-white/40 leading-relaxed font-medium">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Text Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 pt-24 border-t border-white/5">
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none space-y-12">
              <section>
                <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-6">
                  Introduction
                </h2>
                <p className="text-white/60 leading-relaxed">
                  RYDAX Inc. is committed to maintaining the
                  security and confidentiality of your personal information.
                  This Privacy Policy outlines our practices in accordance with
                  the British Columbia Personal Information Protection Act
                  (PIPA).
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-6">
                  Third-Party Disclosure
                </h2>
                <p className="text-white/60 leading-relaxed">
                  We only share information with ICBC as required for test
                  booking and certification. We do not sell, trade, or otherwise
                  transfer your personally identifiable information to outside
                  parties for marketing or research purposes.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-6">
                  Cookies & Tracking
                </h2>
                <p className="text-white/60 leading-relaxed">
                  Our website uses minimal operational cookies to ensure site
                  functionality. We do not use persistent tracking pixel or
                  third-party behavioral monitoring.
                </p>
              </section>
            </div>
          </div>

          {/* Legal Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-10">
            <div className="glass-card border-white/5 p-10 rounded-[3rem] bg-accent/[0.02]">
              <Scale className="w-8 h-8 text-secondary-foreground mb-6" />
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">
                Rights & Portability
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: Eye, text: "Right to access your data" },
                  { icon: Trash2, text: "Right to be forgotten" },
                  { icon: Share2, text: "Right to data portability" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-bold text-white/50"
                  >
                    <item.icon className="w-4 h-4 text-accent" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 bg-linear-to-br from-white/5 to-transparent rounded-[3rem] border border-white/10">
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6">
                Data Officer
              </h3>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">
                For all security related inquiries or data requests, please
                contact our administrative head directly.
              </p>
              <Link
                href="mailto:privacy@rydax.net"
                className="inline-flex items-center gap-3 text-accent font-black uppercase tracking-widest text-xs hover:underline"
              >
                EMAIL PRIVACY DEPT <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Audit Footer */}
      <section className="container mt-40">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-10 border-y border-white/5 opacity-30">
          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-white">
            <HelpCircle className="w-4 h-4" /> Updated: March 2024
          </div>
          <div className="text-xs font-black uppercase tracking-[0.2em] text-white">
            Version 2.4.0
          </div>
        </div>
      </section>
    </main>
  );
}
