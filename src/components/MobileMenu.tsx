"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { X, Bot, Car } from "lucide-react";
import { useBookingContext } from "@/contexts/BookingContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Reviews", href: "/testimonials" },
  { name: "About Us", href: "/about" },
  { name: "Book Now", href: "/?book=1" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { openBooking } = useBookingContext();

  if (!open) return null;

  return (
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
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 w-full overflow-y-auto px-6 py-6 sm:max-w-sm border-l shadow-2xl bg-[#0a0f1a]/98 backdrop-blur-2xl border-white/10"
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3" onClick={onClose}>
            <div className="w-10 h-10 bg-gradient-to-br from-accent via-primary-light to-primary rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-black" />
            </div>
            <span className="font-display font-bold text-lg text-gradient-premium">RYDAX</span>
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-xl p-2.5 text-white/70 hover:text-white"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flow-root">
          <div className="-my-6 divide-y divide-white/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                if (item.name === "Book Now") {
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          openBooking();
                        }}
                        className="-mx-3 block w-full text-left rounded-xl px-3 py-3 text-base font-semibold leading-7 text-white hover:bg-white/5"
                      >
                        {item.name}
                      </button>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`-mx-3 block rounded-xl px-3 py-3 text-base font-semibold leading-7 ${
                        isActive
                          ? "text-[#FFD700] bg-[#FFD700]/10"
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
                  onClose();
                  document.querySelector<HTMLButtonElement>("[data-voice-button]")?.click();
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
  );
}
