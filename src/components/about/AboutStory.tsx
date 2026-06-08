"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Bot, Headphones, CreditCard, BarChart3 } from "lucide-react";

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
               <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2070"
                  alt="Behind the wheel"
                  fill
                  className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-30 group-hover:opacity-60"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
               <div className="absolute inset-0 bg-linear-to-t from-[#030305] via-transparent to-transparent" />
               
               <div className="absolute bottom-10 left-10">
                  <div className="text-4xl font-black text-white leading-tight">Built From <br /> Experience.</div>
               </div>
            </motion.div>

            <motion.div 
               className="absolute -top-10 -right-10 glass-card p-6 rounded-3xl"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
               <div className="flex items-center gap-3 text-accent mb-1">
                  <Bot className="w-4 h-4" />
                  <span className="text-sm font-black">AI-FIRST</span>
               </div>
               <div className="text-xs font-bold text-white/50 uppercase tracking-widest">Purpose Built</div>
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
                <span className="text-secondary-foreground">Driving School Liberation.</span>
              </h2>
              
              <div className="space-y-8 text-xl text-white/50 leading-relaxed font-medium">
                <p>
                  RYDAX was built by SLIIQQUE Studio — a team that has spent years building, operating, and consulting for driving schools. We saw the same problems everywhere: owners drowning in admin, cash flow stress from seasonality, and missed opportunities because the phone kept ringing during lessons.
                </p>
                <p>
                  We built RYDAX to solve these problems permanently. Our AI voice agent handles the calls, our smart scheduler fills every slot, our automated payment system ends the chase, and our marketing engine keeps students coming all year round.
                </p>
                <p>
                  We&apos;re not a generic SaaS platform. We&apos;re a team that understands your business because we&apos;ve lived it. Every feature, every integration, every update is driven by real driving school experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                 {[
                    { icon: Headphones, title: "Real Support", desc: "Talk to people who know driving schools, not a ticket bot." },
                    { icon: CreditCard, title: "No Lock-In", desc: "Cancel anytime. Your data is yours. We earn your business every month." }
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