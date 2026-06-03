"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Mail, MapPin, ArrowRight, Phone, Car } from "lucide-react";

const navigation = {
  services: [
    { name: "Standard Lessons", href: "/services" },
    { name: "Intensive Courses", href: "/services" },
    { name: "Block Bookings", href: "/pricing" },
    { name: "Pass Plus", href: "/services" },
    { name: "Pricing", href: "/pricing" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Areas Covered", href: "/areas" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#030305] text-white overflow-hidden pt-20 lg:pt-32 pb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span
            className="font-display text-[15vw] lg:text-[20vw] font-bold text-white opacity-[0.02] leading-none tracking-tighter lg:whitespace-nowrap"
            style={{
              transform: "scale(1.2)",
              WebkitTextStroke: "1px rgba(255, 215, 0, 0.1)",
            }}
          >
            Rydax
          </span>
        </motion.div>
      </div>

      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-light/10 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="container relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-accent via-primary-light to-primary rounded-xl flex items-center justify-center">
                  <Car className="w-7 h-7 text-black" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent via-primary-light to-primary rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 215, 0, 0.4)",
                      "0 0 40px rgba(255, 215, 0, 0.6)",
                      "0 0 20px rgba(255, 215, 0, 0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <span className="font-display font-bold text-2xl text-white tracking-tight">
                  Rydax
                </span>
                <span className="font-display font-bold text-2xl text-gradient-premium tracking-tight ml-1">
                  Driving
                </span>
              </div>
            </Link>
            <p className="text-sm leading-7 text-white/60 max-w-md mb-8">
              Professional driving instruction in Surrey, BC. ICBC licensed
              driving school serving the Lower Mainland. Helping learners pass
              their driving test with confidence since 2018.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              <motion.a
                href="tel:+1604XXXXXXX"
                className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                (604) XXX-XXXX
              </motion.a>
              <motion.a
                href="mailto:info@bhandhdrivingschool.ca"
                className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                info@bhandhdrivingschool.ca
              </motion.a>
              <motion.div
                className="flex items-center gap-3 text-white/70"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                12588 68A Ave, Surrey, BC V3W 1M2
              </motion.div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">
                Services
              </h3>
              <ul role="list" className="space-y-4">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-2 group text-nowrap"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">
                Company
              </h3>
              <ul role="list" className="space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-2 group text-nowrap"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">
                Legal
              </h3>
              <ul role="list" className="space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-2 group text-nowrap"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
