"use client";

import { motion } from "motion/react";
import { Quote, Star, MapPin } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Surrey, BC",
    rating: 5,
    text: "Kerry is an excellent instructor. Very patient and professional. I was nervous about learning to drive but he made me feel at ease from the first lesson.",
  },
  {
    name: "James Thompson",
    location: "Langley, BC",
    rating: 5,
    text: "Passed first time! Kerry's teaching method is brilliant - clear, patient, and always supportive. Would highly recommend to anyone wanting to learn.",
  },
  {
    name: "Emma Richardson",
    location: "Delta, BC",
    rating: 5,
    text: "After failing twice elsewhere, Kerry helped me pass on my third attempt. His patience and expertise made all the difference.",
  },
  {
    name: "David Clarke",
    location: "Richmond, BC",
    rating: 5,
    text: "Great instructor, very flexible with scheduling. My confidence grew rapidly under his guidance. Highly recommend!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section bg-[#030305] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-primary-light/10 border border-primary-light/20 rounded-full text-primary-light text-sm font-medium mb-4"
          >
            Testimonials
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            What Our <span className="text-gradient-cool">Students Say</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our students have to say about learning to drive with Rydax.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, rotateX: 2 }}
              className="premium-card p-8 relative group"
            >
              {/* Quote Icon */}
              <motion.div
                className="absolute top-6 right-6 w-10 h-10 text-accent/20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Quote className="w-full h-full" />
              </motion.div>
              
              {/* Rating Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + j * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Star className="w-5 h-5 text-accent fill-accent" />
                  </motion.div>
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-lg text-white/70 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              
              {/* Author Info */}
              <div className="flex items-center justify-between border-t border-white/10 pt-5">
                <div>
                  <motion.div
                    className="font-bold text-white text-lg"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {testimonial.name}
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-1 text-sm text-white/50 mt-1"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </motion.div>
                </div>
                
                {/* Avatar Placeholder */}
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-accent via-primary-light to-primary rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <span className="text-black font-bold text-lg">{testimonial.name[0]}</span>
                </motion.div>
              </div>
              
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
