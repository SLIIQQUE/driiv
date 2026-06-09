"use client";

import { motion, useScroll, useTransform } from "motion/react";
import {
  Quote,
  Star,
  MapPin,
  Award,
  CheckCircle,
} from "lucide-react";
import { useRef } from "react";
import { PageHero, PageTitle, PageDescription, EcosystemGrid, CTASection } from "@/components/ui";

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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <PageHero label="Social Proof" />

          <h1 className="sr-only">
            Student Reviews — RyDax Driving School Surrey BC
          </h1>
          <PageTitle>
            Over a thousand <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">
              success narratives.
            </span>
          </PageTitle>

          <PageDescription className="my-10">
            Our students consistently highlight the seamless orchestration. AI
            booking, online payments, automated reminders, and progress
            intelligence — all converging so you can concentrate on the road.
          </PageDescription>
        </div>
      </section>

      <section className="container mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-8 items-center justify-center lg:justify-start opacity-40"
        >
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
            <CheckCircle className="w-4 h-4 text-accent" /> ICBC Certified
          </div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
            <Award className="w-4 h-4 text-accent" /> 95% Pass Rate
          </div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
            <Star className="w-4 h-4 fill-secondary-foreground" /> Google
            Verified
          </div>
        </motion.div>
      </section>

      <section ref={sectionRef} className="container">
        <motion.div
          className="columns-1 md:columns-2 lg:columns-3 gap-8 mt-20"
          style={{ y }}
        >
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
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 + j * 0.03 }}
                    >
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-[10px] font-black text-accent uppercase tracking-widest ml-2 bg-accent/10 px-2 py-0.5 rounded-full">
                  {testimonial.tag}
                </span>
              </div>

              <p className="text-sm text-white/60 leading-relaxed font-medium mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="mt-auto flex items-center gap-5 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-xl text-white/20 hover:scale-110 hover:bg-accent/10 transition-all duration-300">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tighter">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-widest">
                    <MapPin className="w-3 h-3" /> {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border-white/5 p-10 lg:p-16 rounded-[3rem] relative overflow-hidden mb-20"
        >
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full" />
          <div className="text-center mb-8 relative z-10">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">
              Every student experiences
            </h3>
          </div>
          <EcosystemGrid />
        </motion.div>
      </section>

      <CTASection
        title={
          <>
            Author Your{" "}
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
              Success Narrative.
            </span>
          </>
        }
        description="Join over 1,000 students who experienced sophisticated driver education. Book online in under sixty seconds."
        buttonText="Begin Your Journey"
      />
    </main>
  );
}
