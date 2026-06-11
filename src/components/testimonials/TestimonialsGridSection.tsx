"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Quote, Star, MapPin, Award, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui";
import { TESTIMONIALS } from "@/data/testimonials";

type Testimonial = (typeof TESTIMONIALS)[number];
const testimonials: Testimonial[] = TESTIMONIALS;

export function TestimonialsGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className="container mb-20">
      <ScrollReveal className="flex flex-wrap gap-8 items-center justify-center lg:justify-start opacity-40">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
          <CheckCircle className="w-4 h-4 text-accent" /> ICBC Certified
        </div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
          <Award className="w-4 h-4 text-accent" /> 95% Pass Rate
        </div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
          <Star className="w-4 h-4 fill-secondary-foreground" /> Google Verified
        </div>
      </ScrollReveal>

      <section ref={sectionRef}>
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
    </section>
  );
}
