"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Phone, Car, Award, Shield, CheckCircle, Clock } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yTranslate = useTransform(scrollY, [0, 800], [0, 200]);
  const textScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const isLight = mounted && document.documentElement.getAttribute("data-theme") === "light";

  return (
    <section 
      className="relative min-h-[105dvh] flex items-center justify-center overflow-hidden pt-32 pb-40 lg:pb-64"
      onMouseMove={handleMouseMove}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-bg" />
        
        {/* Large Decorative Text Background */}
        <motion.div 
          className="absolute -right-20 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{ y: yTranslate }}
        >
          <span className="text-[30vw] font-black leading-none tracking-tighter">DRIVE</span>
        </motion.div>

        {/* Dynamic Orbs */}
        <motion.div
          className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ 
            background: "radial-gradient(circle, #FFD700 0%, transparent 70%)",
            y: useTransform(scrollY, [0, 1000], [0, 150])
          }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none"
          style={{ 
            background: "radial-gradient(circle, #1A2B48 0%, transparent 70%)",
            y: useTransform(scrollY, [0, 1000], [0, -100])
          }}
        />
        
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Content Column */}
          <motion.div 
            className="lg:col-span-7 text-left"
            style={{ scale: textScale, opacity: opacityFade }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/10 rounded-full mb-8 backdrop-blur-md"
            >
              <Award className="w-4 h-4 text-accent" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-accent">Top Rated Driving School in Surrey</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8"
            >
              Mastering the <br />
              <span className="text-gradient">Road Ahead.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/60 max-w-xl mb-12 leading-relaxed"
            >
              ICBC licensed instruction that transforms nervous beginners into confident, skilled drivers. We don&apos;t just teach you to pass; we teach you to drive for life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
            >
              <Link href="/contact" className="btn-3d px-10 py-5 text-lg flex items-center justify-center gap-3">
                Book a Lesson <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/services" className="btn btn-secondary px-10 py-5 text-lg border-2 flex items-center justify-center gap-2">
                <span>Our Courses</span>
              </Link>
            </motion.div>

            {/* Quick Benefits */}
            <motion.div 
              className="mt-16 flex flex-wrap gap-8 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: Shield, text: "95% Pass Rate" },
                { icon: Car, text: "Dual-Control Cars" },
                { icon: Clock, text: "Flexible Slots" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-bold opacity-70 uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual / 3D Column */}
          <motion.div 
            className="lg:col-span-5 hidden lg:block perspective-1000"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              className="relative aspect-square"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              {/* Main Visual Element - Glass Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/20 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
                
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center shadow-lg shadow-accent/30">
                      <Car className="w-10 h-10 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-white">CLASS 5/7</div>
                      <div className="text-accent font-bold uppercase tracking-widest text-xs">Road Test Specialist</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="glass-card p-6 border-white/10">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-2 h-10 bg-accent rounded-full" />
                        <div>
                          <div className="text-white font-bold">Today&apos;s Lesson</div>
                          <div className="text-white/40 text-xs">Surrey Training Center</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-xs text-white/60">08:00 AM - 10:00 AM</div>
                        <div className="text-accent flex items-center gap-1 text-sm font-bold">
                          <CheckCircle className="w-4 h-4" /> Confirmed
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                       <div className="flex-1 glass-card p-4 text-center border-white/5">
                          <div className="text-2xl font-black text-white">5+</div>
                          <div className="text-[10px] uppercase text-white/40">Years Exp</div>
                       </div>
                       <div className="flex-1 glass-card p-4 text-center border-white/5">
                          <div className="text-2xl font-black text-white">1k+</div>
                          <div className="text-[10px] uppercase text-white/40">Students</div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbital Element 1 */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 glass-card rounded-full border-accent/30 flex items-center justify-center text-accent"
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Shield className="w-12 h-12" />
              </motion.div>

              {/* Orbital Element 2 */}
              <motion.div
                className="absolute -bottom-8 -left-12 px-6 py-4 glass-card border-white/20 rounded-2xl flex items-center gap-3 backdrop-blur-2xl"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-white uppercase tracking-widest whitespace-nowrap">ICBC Approved</span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
