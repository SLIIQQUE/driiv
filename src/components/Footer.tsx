import Link from "next/link";
import { Mail, MapPin, ArrowRight, Phone, Car } from "lucide-react";
import BookNowTrigger from "@/components/BookNowTrigger";

const navigation = {
  services: [
    { name: "Foundation Pass", href: "/pricing" },
    { name: "Power Pack", href: "/pricing" },
    { name: "Mastery Bundle", href: "/pricing" },
    { name: "Pricing & Packages", href: "/pricing" },
    { name: "Book Now", href: "/?book=1" },
    { name: "FAQ", href: "/faq" },
  ],
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
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#030305] text-white overflow-hidden pt-20 lg:pt-32 pb-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-[15vw] lg:text-[20vw] font-bold text-white opacity-[0.02] leading-none tracking-tighter lg:whitespace-nowrap"
            style={{
              transform: "scale(1.2)",
              WebkitTextStroke: "1px rgba(255, 215, 0, 0.1)",
            }}
          >
            RYDAX
          </span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px] opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-light/10 rounded-full blur-[150px] opacity-30" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          <div className="lg:col-span-4">
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
            <p className="text-sm leading-7 text-white/60 max-w-md mb-8">
              Surrey&apos;s most advanced driving school. AI-powered booking, automated reminders, and ICBC licensed instruction. Learn to drive with confidence.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="tel:+16041234567"
                className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors group hover-x"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                (604) 123-4567
              </a>
              <a
                href="mailto:hello@rydax.net"
                className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors group hover-x"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                hello@rydax.net
              </a>
              <div className="flex items-center gap-3 text-white/70 hover-x">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                12588 68A Ave, Surrey, BC V3W 1M2
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">
                Programs
              </h3>
              <ul role="list" className="space-y-4">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    {item.name === "Book Now" ? (
                      <BookNowTrigger className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-2 group text-nowrap w-full text-left">
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                        {item.name}
                      </BookNowTrigger>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-2 group text-nowrap"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">
                Quick Links
              </h3>
              <ul role="list" className="space-y-4">
                {navigation.quickLinks.map((item) => (
                  <li key={item.name}>
                    {item.name === "Book Now" ? (
                      <BookNowTrigger className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-2 group text-nowrap w-full text-left">
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                        {item.name}
                      </BookNowTrigger>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-2 group text-nowrap"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                        {item.name}
                      </Link>
                    )}
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
          </div>
        </div>
      </div>
    </footer>
  );
}
