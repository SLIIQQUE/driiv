"use client";

import { motion } from "motion/react";
import { Star, Shield, Award, MapPin } from "lucide-react";

export function AboutStory() {
  return (
    <section className="py-24 lg:py-40 bg-[#030305] relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Visual Side */}
          <div className="lg:col-span-5 relative">
            <motion.div 
               className="aspect-square rounded-[3rem] bg-linear-to-br from-white/5 to-transparent border border-white/10 p-2 overflow-hidden relative group"
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-30 group-hover:opacity-60" />
               <div className="absolute inset-0 bg-linear-to-t from-[#030305] via-transparent to-transparent" />
               
               <div className="absolute bottom-10 left-10">
                  <div className="text-4xl font-black text-white leading-tight">Setting <br /> The Pace.</div>
               </div>
            </motion.div>

            {/* Floating Stats */}
            <motion.div 
               className="absolute -top-10 -right-10 glass-card p-6 rounded-3xl"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
               <div className="flex items-center gap-3 text-accent mb-1">
                  <Star className="w-4 h-4 fill-accent" />
                  <span className="text-sm font-black">ICBC LICENSED</span>
               </div>
               <div className="text-xs font-bold text-white/50 uppercase tracking-widest">Surrey & Delta</div>
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">
                Our Mission is <br />
                <span className="text-secondary-foreground">Absolute Confidence.</span>
              </h2>
              
              <div className="space-y-8 text-xl text-white/50 leading-relaxed font-medium">
                <p>
                  B & H Driving School wasn&apos;t built just to teach people how to pass a road test. It was built to create drivers who are fundamentally safe, aware, and in command of their vehicle.
                </p>
                <p>
                  Under Kerry Hare&apos;s leadership, we have developed a personalized coaching methodology that adapts to each student&apos;s pace. Whether you&apos;re a nervous beginner or looking to refine your skills for a Class 5, our approach remains the same: patience, precision, and excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                 {[
                    { icon: Shield, title: "Modern Safety", desc: "Dual-control vehicles with the latest safety tech." },
                    { icon: MapPin, title: "Local Presence", desc: "Expert knowledge of Surrey & Langley test routes." }
                 ].map((box, i) => (
                    <div key={i} className="flex gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <box.icon className="w-6 h-6 text-accent" />
                       </div>
                       <div>
                          <h4 className="text-white font-bold mb-2">{box.title}</h4>
                          <p className="text-sm text-white/40 leading-relaxed">{box.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
