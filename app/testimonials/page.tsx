"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Quote, Star, MapPin, Award, CheckCircle, ArrowRight, Bot, Bell, CreditCard, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Surrey, BC",
    rating: 5,
    text: "I booked my inaugural session at 11 PM on a Tuesday and received confirmation before I could put my phone down. The automated pulses meant I never once lost a session. After every lesson, the digital dashboard revealed my progress with surgical clarity. Passed my Class 7 on the first attempt. From first click to license — entirely frictionless.",
    tag: "First-Try Pass",
  },
  {
    name: "James Thompson",
    location: "Langley, BC",
    rating: 5,
    text: "Zero experience to licensed in fourteen days. The AI concierge answered every question before I committed. I paid online, received reminders before each rendezvous, and the progress metrics revealed compounding skill gains session by session. No paperwork. No phone calls. Pure modern mastery.",
    tag: "Accelerator Graduate",
  },
  {
    name: "Emma Richardson",
    location: "Delta, BC",
    rating: 5,
    text: "After failing twice with conventional schools, RYDAX diagnosed and corrected my deficiencies in three sessions. The ability to book online, pay by card, and review my progress intelligence after each session eliminated every ounce of guesswork. The entire ecosystem operates in perfect orchestration.",
    tag: "Test Mastery",
  },
  {
    name: "David Clarke",
    location: "Richmond, BC",
    rating: 5,
    text: "The orchestration is what distinguishes this experience. Booked, paid, tracked — all from a single device. Never wrote a cheque, never waited on hold. The AI answered my inquiries at midnight. This is what driver education should feel like when technology is engineered around the student.",
    tag: "Seamless Experience",
  },
  {
    name: "Lisa Watson",
    location: "Burnaby, BC",
    rating: 5,
    text: "What convinced me was the elimination of phone calls. Everything exists online — booking, payment, reminders. The progress intelligence after each session is extraordinary. I watched my scores compound from 60% to 95% over eight sessions. Passed with a near-perfect evaluation.",
    tag: "Class 5 Pass",
  },
  {
    name: "Michael Brown",
    location: "New Westminster, BC",
    rating: 5,
    text: "The search ends here. The technology orchestrates everything effortlessly — AI booking, encrypted payments, automated reminders, progress intelligence. And the instruction itself is world-class. The most sophisticated driving academy in Metro Vancouver, unequivocally.",
    tag: "Gold Standard",
  },
];

export default function TestimonialsPage() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8"
          >
            <div className="w-12 h-px bg-accent" />
            Social Proof
          </motion.div>

          <h1 className="sr-only">Student Reviews — RyDax Driving School Surrey BC</h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10"
          >
            Over a thousand <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">success narratives.</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium"
          >
            Our students consistently highlight the seamless orchestration. AI booking, online payments, automated reminders, and progress intelligence — all converging so you can concentrate on the road.
          </motion.p>
        </div>
      </section>

      <section className="container mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-8 items-center justify-center lg:justify-start opacity-40"
        >
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><CheckCircle className="w-4 h-4 text-accent" /> ICBC Certified</div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Award className="w-4 h-4 text-accent" /> 95% Pass Rate</div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Star className="w-4 h-4 fill-secondary-foreground" /> Google Verified</div>
        </motion.div>
      </section>

      <section ref={sectionRef} className="container">
        <motion.div className="columns-1 md:columns-2 lg:columns-3 gap-8" style={{ y }}>
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="break-inside-avoid glass-card border-white/5 p-8 lg:p-10 rounded-[3rem] group relative overflow-hidden flex flex-col mb-8 cursor-default hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-accent/10 transition-colors duration-500" />

              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <motion.div key={j} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 + j * 0.03 }}>
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-[9px] font-black text-accent uppercase tracking-widest ml-2 bg-accent/10 px-2 py-0.5 rounded-full">
                  {testimonial.tag}
                </span>
              </div>

              <p className="text-sm text-white/60 leading-relaxed font-medium mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="mt-auto flex items-center gap-5 pt-6 border-t border-white/5">
                <div
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-xl text-white/20 hover:scale-110 hover:bg-accent/10 transition-all duration-300"
                >
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tighter">{testimonial.name}</h4>
                  <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-widest">
                    <MapPin className="w-3 h-3" /> {testimonial.location}
                  </div>
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
          className="glass-card border-white/5 p-10 lg:p-14 rounded-[3rem] relative overflow-hidden"
        >
          <div
            className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full"
          />
          <div className="text-center mb-8 relative z-10">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Every student experiences</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {[
              { icon: Bot, label: "AI Concierge", sub: "24/7" },
              { icon: Bell, label: "Reminders", sub: "Automated" },
              { icon: CreditCard, label: "Online Pay", sub: "Cashless" },
              { icon: BarChart3, label: "Progress Intel", sub: "After each" },
            ].map((item, i) => (
              <div key={i} className="hover:-translate-y-1 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-sm font-black uppercase tracking-wider text-white/40">{item.label}</div>
                <div className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{item.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="premium-card p-12 lg:p-24 text-center relative overflow-hidden bg-accent/5"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
              Author Your{" "}
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">Success Narrative.</span>
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto mb-12 font-medium">
              Join over 1,000 students who experienced sophisticated driver education. Book online in under sixty seconds.
            </p>
            <Link
              href="/contact"
              className="group relative px-12 py-6 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest overflow-hidden shadow-2xl shadow-accent/20 inline-flex items-center gap-3"
            >
              <span className="relative z-10 flex items-center gap-3">
                Begin Your Journey <ArrowRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}