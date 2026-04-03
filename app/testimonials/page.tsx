"use client";

import { motion } from "motion/react";
import {
  Quote,
  Star,
  MapPin,
  CheckCircle,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Surrey, BC",
    rating: 5,
    text: "Kerry is an absolute master of her craft. Her patience transformed my driving anxiety into total road confidence. Passed the Class 7 on my first attempt!",
    type: "Personal Story",
    tag: "Passed 1st Time",
  },
  {
    name: "James Thompson",
    location: "Langley, BC",
    rating: 5,
    text: "The Elite Intensive course was exactly what I needed. Professional, structured, and high-impact. I went from zero to licensed in 14 days.",
    type: "Intensive Graduate",
    tag: "Highly Recommended",
  },
  {
    name: "Emma Richardson",
    location: "Delta, BC",
    rating: 5,
    text: "After failing twice with other schools, B&H fixed my technique in three sessions. Their feedback is incredibly precise. Forever grateful!",
    type: "Technique Refinement",
    tag: "Test Mastery",
  },
  {
    name: "David Clarke",
    location: "Richmond, BC",
    rating: 5,
    text: "Precision coaching at its best. The curriculum is modern and the vehicle safety is top-notch. Best investment I've made this year.",
    type: "Professional Review",
    tag: "Elite Standards",
  },
  {
    name: "Lisa Watson",
    location: "Burnaby, BC",
    rating: 5,
    text: "Supportive, clear, and extremely professional. Kerry builds more than just skills—she builds mindset. Passed with a near-perfect score.",
    type: "Confidence Build",
    tag: "Class 5 Pass",
  },
  {
    name: "Michael Brown",
    location: "New Westminster, BC",
    rating: 5,
    text: "Don't bother looking anywhere else. If you want high-end instruction and reliable results, B&H is the only choice in Surrey.",
    type: "Industry Review",
    tag: "Gold Standard",
  },
];

export default function TestimonialsPage() {
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
            Social Proof
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
            Proven <br />
            <span className="text-secondary-foreground underline decoration-secondary-foreground/20 decoration-8 underline-offset-12">
              Excellence.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium">
            Over a thousand students have mastered the BC roads with our studio.
            Their success is our only metric of performance.
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="container mb-20">
        <div className="flex flex-wrap gap-12 items-center justify-center lg:justify-start opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-3 font-black text-white tracking-widest uppercase text-xs">
            <CheckCircle className="w-5 h-5 text-accent" /> ICBC Certified
          </div>
          <div className="flex items-center gap-3 font-black text-white tracking-widest uppercase text-xs">
            <Award className="w-5 h-5 text-accent" /> Top Rated 2024
          </div>
          <div className="flex items-center gap-3 font-black text-white tracking-widest uppercase text-xs text-secondary-foreground">
            <Star className="w-5 h-5 fill-secondary-foreground" /> Google
            Verified
          </div>
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Testimonials Masonry Grid */}
      <section className="container">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid glass-card border-white/5 p-8 lg:p-10 rounded-[3rem] group relative overflow-hidden flex flex-col mb-8"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/10 group-hover:text-accent/20 transition-colors duration-500" />

              <div className="flex items-center gap-2 mb-8">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
                <span className="text-[10px] font-black text-accent uppercase tracking-widest ml-2 bg-accent/10 px-2 py-0.5 rounded-full">
                  {testimonial.tag}
                </span>
              </div>

              <p className="text-xl text-white/80 leading-relaxed font-medium mb-10 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="mt-auto flex items-center gap-5 pt-8 border-t border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center font-black text-2xl text-white/20 group-hover:text-accent transition-colors">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-tighter">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-2 text-white/30 text-xs font-bold">
                    <MapPin className="w-3 h-3" /> {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="mt-20"></div>

      {/* Final CTA Banner */}
      <section className="container mt-32">
        <div className="premium-card p-12 lg:p-24 text-center relative overflow-hidden bg-accent/5">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
              Be Our Next{" "}
              <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
                Success Story.
              </span>
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto mb-12 font-medium">
              Join over 1,000 confident drivers who started their journey at B &
              H Driving School.
            </p>
            <Link
              href="/contact"
              className="px-12 py-6 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest hover:scale-110 transition-all shadow-2xl shadow-accent/20 inline-flex items-center gap-3"
            >
              Start Your Training <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
