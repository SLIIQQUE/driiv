"use client";

import { motion } from "motion/react";
import {
  Scale,
  FileText,
  Clock,
  CreditCard,
  ShieldAlert,
  AlertCircle,
  ArrowRight,
  Phone,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const termPillars = [
  {
    icon: FileText,
    title: "Lesson Bookings",
    content:
      "All training slots are confirmed only upon receipt of payment or a valid block-booking credit. We reserve the right to reschedule lessons based on extreme weather or vehicle maintenance.",
  },
  {
    icon: Clock,
    title: "Cancellation Loop",
    content:
      "Our 24-hour notice window is strictly enforced. Cancellations within this timeframe will be charged at the full hourly rate to compensate for lost instructional time.",
  },
  {
    icon: CreditCard,
    title: "Refund Protocol",
    content:
      "Block booking packages are valid for 12 months from the date of purchase. Refunds for unused hours are calculated by reverting lessons to the standard hourly rate.",
  },
  {
    icon: ShieldAlert,
    title: "Instructor Rights",
    content:
      "Instructors reserve the right to terminate any lesson immediately if they believe the student is under the influence of drugs, alcohol, or is behaving unsafely.",
  },
];

export default function TermsPage() {
  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      {/* Cinematic Header */}
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Studio Engagement
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
            Terms of <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">
              Service.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium">
            The legal framework governing our relationship. Clear, fair, and
            designed to protect both the learner and the studio.
          </p>
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Pillars of Agreement */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-32">
          {termPillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-10 lg:p-14 rounded-[4rem] group"
            >
              <pillar.icon className="w-10 h-10 text-accent mb-8 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
                {pillar.title}
              </h3>
              <p className="text-lg text-white/40 leading-relaxed font-medium">
                {pillar.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Legal Text Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 pt-24 border-t border-white/5">
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none space-y-16">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-5xl font-black text-accent/20 font-mono tracking-tighter">
                    01
                  </div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight">
                    The Agreement
                  </h2>
                </div>
                <p className="text-xl text-white/60 leading-relaxed max-w-3xl">
                  By booking a lesson with Rydax School, you enter into
                  a binding agreement with us under the following terms. This
                  agreement is governed by the laws of British Columbia, Canada.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-5xl font-black text-accent/20 font-mono tracking-tighter">
                    02
                  </div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight">
                    Financial Obligations
                  </h2>
                </div>
                <div className="space-y-6 text-white/60 leading-relaxed">
                  <p>
                    Payment must be made in full before the commencement of any
                    lesson or package. We accept e-transfer and credit card
                    payments.
                  </p>
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      Hourly rates are subject to change with 30 days notice.
                    </li>
                    <li>
                      Pre-paid packages are non-transferable to other students.
                    </li>
                    <li>
                      Refunds are processed within 14 business days of
                      verification.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-5xl font-black text-accent/20 font-mono tracking-tighter">
                    03
                  </div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight">
                    Safety & Liability
                  </h2>
                </div>
                <p className="text-white/60 leading-relaxed max-w-3xl">
                  Our vehicles are fully insured and equipped with
                  dual-controls. Students are liable for any traffic violations
                  or points incurred due to intentional disregard of instructor
                  commands. We take every precaution to ensure your safety and
                  the safety of other road users.
                </p>
              </section>
            </div>
          </div>

          {/* Legal Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card border-white/5 p-10 rounded-[3rem] sticky top-32">
              <AlertCircle className="w-8 h-8 text-accent mb-6" />
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">
                Critical Clause
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-10 font-medium">
                Rydax School does not guarantee a first-time pass. While
                our pass rate is 95%, ICBC decisions remain at the sole
                discretion of the testing officer.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-sm font-bold text-white/60">
                  <Scale className="w-4 h-4 text-accent" /> British Columbia
                  Jurisdiction
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-white/60">
                  <Clock className="w-4 h-4 text-accent" /> 24h Cancellation
                  Window
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs transition-all"
              >
                LEGAL CLARIFICATION <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Support Strip */}
      <section className="container mt-40">
        <div className="glass-card border-white/5 p-12 lg:p-16 rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-12 bg-linear-to-br from-accent/5 to-transparent">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
              Need Further Clarity?
            </h2>
            <p className="text-white/40 font-medium">
              Our administrative head is available for any legal or policy
              questions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="/contact"
              className="px-8 py-5 bg-accent text-primary rounded-2xl flex items-center gap-3 font-black uppercase tracking-widest text-xs"
            >
              <MessageSquare className="w-4 h-4" /> MESSAGE US
            </Link>
            <Link
              href="tel:+1604XXXXXXX"
              className="px-8 py-5 border border-white/10 text-white rounded-2xl flex items-center gap-3 font-black uppercase tracking-widest text-xs"
            >
              <Phone className="w-4 h-4" /> CALL OFFICE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
