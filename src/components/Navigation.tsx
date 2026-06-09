"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Menu, Bot, Car } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { useBookingContext } from "@/contexts/BookingContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Reviews", href: "/testimonials" },
  { name: "About Us", href: "/about" },
  { name: "Book Now", href: "/?book=1" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const { openBooking } = useBookingContext();
  const { scrollY } = useScroll();

  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0f1a]/95 backdrop-blur-2xl border-white/5 py-3"
            : "bg-transparent py-6"
        }`}
        style={{
          backgroundColor: scrolled
            ? `rgba(10, 15, 26, ${headerOpacity.get()})`
            : "transparent",
          backdropFilter: `blur(${headerBlur.get()}px)`,
        }}
      >
        <nav className="container relative" aria-label="Global">
          <div className="flex items-center justify-between">
            <div className="flex xl:flex-1">
              <Link href="/" aria-label="Home" className="-m-1.5 p-1.5 flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent via-primary-light to-primary rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Car className="w-6 h-6 text-black" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary-light to-primary rounded-xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-display font-bold text-xl tracking-tight text-gradient-premium">RYDAX</span>
                </div>
              </Link>
            </div>

            <div className="hidden xl:flex xl:gap-x-8 items-center">
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                if (item.name === "Book Now") {
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={openBooking}
                      className="relative text-sm font-medium transition-all duration-300"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {hoveredItem === item.name && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#ccaa00] rounded-full"
                          layoutId="nav-underline"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative text-sm font-medium transition-all duration-300"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{ color: isActive ? "#FFD700" : "rgba(255,255,255,0.7)" }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {(isActive || hoveredItem === item.name) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#ccaa00] rounded-full"
                        layoutId="nav-underline"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden xl:flex xl:flex-1 xl:justify-end items-center gap-4">
              <button
                onClick={() =>
                  document.querySelector<HTMLButtonElement>("[data-voice-button]")?.click()
                }
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#ccaa00] text-[#1A2B48] font-semibold rounded-full hover:shadow-lg hover:shadow-[#FFD700]/30 hover:scale-105 active:scale-95 transition-all group"
                style={{ boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)" }}
                aria-label="Open AI Assistant"
              >
                <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="text-sm">AI Assistant</span>
              </button>
            </div>

            <div className="flex xl:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-white"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open main menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />}
      </AnimatePresence>

      <div className="noise-overlay" />
    </>
  );
}
