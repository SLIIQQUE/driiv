"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Menu, X, Bot, Car } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Areas", href: "/areas" },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6">
        <nav className="container relative">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1A2B48] to-[#2d4a7c] rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-[#FFD700]" />
              </div>
            </Link>
          </div>
        </nav>
      </header>
    );
  }

  const isLight = document.documentElement.getAttribute("data-theme") === "light";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isLight 
              ? "bg-white/95 dark:bg-[#0a0f1a]/95 backdrop-blur-2xl border-b border-gray-200/20 dark:border-white/5 py-3"
              : "bg-[#0a0f1a]/95 backdrop-blur-2xl border-b border-white/5 py-3"
            : "bg-transparent py-6"
        }`}
        style={{
          backgroundColor: scrolled 
            ? isLight 
              ? `rgba(255, 255, 255, ${headerOpacity.get()})`
              : `rgba(10, 15, 26, ${headerOpacity.get()})` 
            : "transparent",
          backdropFilter: `blur(${headerBlur.get()}px)`,
        }}
      >
        <nav className="container relative" aria-label="Global">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex xl:flex-1"
              style={{ scale: logoScale }}
            >
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-[#1A2B48] to-[#2d4a7c] rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Car className="w-6 h-6 text-[#FFD700]" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#1A2B48] to-[#2d4a7c] rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(26, 43, 72, 0.5)",
                        "0 0 40px rgba(255, 215, 0, 0.3)",
                        "0 0 20px rgba(26, 43, 72, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="hidden sm:block">
                  <span className={`font-display font-bold text-xl tracking-tight ${isLight ? "text-[#1A2B48]" : "text-white"}`}>
                    B & H
                  </span>
                  <span className="font-display font-bold text-xl text-gradient tracking-tight ml-1">
                    Driving
                  </span>
                </div>
              </Link>
            </motion.div>

            <div className="hidden xl:flex xl:gap-x-8 items-center">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative text-sm font-medium transition-all duration-300"
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      color: isActive ? "#FFD700" : isLight ? "rgba(26, 43, 72, 0.7)" : "rgba(255,255,255,0.7)",
                    }}
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
              <motion.button
                onClick={() => document.querySelector<HTMLButtonElement>('[data-voice-button]')?.click()}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#ccaa00] text-[#1A2B48] font-semibold rounded-full hover:shadow-lg hover:shadow-[#FFD700]/30 transition-all group"
                style={{
                  boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open AI Assistant"
              >
                <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="text-sm">AI Assistant</span>
              </motion.button>
            </div>

            <div className="flex xl:hidden">
              <button
                type="button"
                className={`-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 ${isLight ? "text-[#1A2B48]" : "text-white"}`}
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open main menu"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] xl:hidden"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed inset-y-0 right-0 w-full overflow-y-auto px-6 py-6 sm:max-w-sm border-l shadow-2xl ${
                isLight 
                  ? "bg-white/98 backdrop-blur-2xl border-gray-200" 
                  : "bg-[#0a0f1a]/98 backdrop-blur-2xl border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  className="-m-1.5 p-1.5 flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1A2B48] to-[#2d4a7c] rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <span className={`font-display font-bold text-lg ${isLight ? "text-[#1A2B48]" : "text-white"}`}>
                    B & H Driving
                  </span>
                </Link>
                <button
                  type="button"
                  className={`-m-2.5 rounded-xl p-2.5 ${isLight ? "text-gray-500 hover:text-[#1A2B48]" : "text-white/70 hover:text-white"}`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flow-root">
                <div className={`-my-6 divide-y ${isLight ? "divide-gray-200" : "divide-white/10"}`}>
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`-mx-3 block rounded-xl px-3 py-3 text-base font-semibold leading-7 ${
                              isActive 
                                ? "text-[#FFD700] bg-[#FFD700]/10" 
                                : isLight 
                                  ? "text-[#1A2B48] hover:bg-gray-100" 
                                  : "text-white hover:bg-white/5"
                            }`}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="py-6">
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        document.querySelector<HTMLButtonElement>('[data-voice-button]')?.click();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#FFD700] to-[#ccaa00] text-[#1A2B48] font-bold rounded-xl"
                      aria-label="Open AI Assistant"
                    >
                      <Bot className="w-5 h-5" />
                      AI Assistant
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
      <div className="noise-overlay" />
    </>
  );
}
