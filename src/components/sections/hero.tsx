"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Calendar, Shield, User, MapPin, Tag } from "lucide-react";
import { HeroStats } from "@/components/sections";
import { BorderGlow, SpecularButton } from "@/components/shared";
import { useUIStore } from "@/store/ui-store";
import { useReducedMotion } from "@/lib/motion";

export function Hero() {
  const { hasPlayedHeroAnimation, setHasPlayedHeroAnimation } = useUIStore();
  const prefersReducedMotion = useReducedMotion();
  const skipAnimations = hasPlayedHeroAnimation || prefersReducedMotion;

  useEffect(() => {
    if (!hasPlayedHeroAnimation) {
      const timer = setTimeout(() => {
        setHasPlayedHeroAnimation(true);
      }, 2500); // Sequence completes around 2.2s
      return () => clearTimeout(timer);
    }
  }, [hasPlayedHeroAnimation, setHasPlayedHeroAnimation]);

  const headline = "Find Your Perfect Rental Home in Ranchi";
  const words = headline.split(" ");
  let charIndexCounter = 0;
  const animatedWords = words.map((word) => {
    const chars = word.split("").map((char) => ({
      char,
      globalIndex: charIndexCounter++,
    }));
    charIndexCounter++; // Add one for the space
    return chars;
  });

  return (
    <section className="relative w-full flex flex-col items-center bg-background overflow-hidden pt-24 lg:pt-28 pb-16 lg:pb-24">
      
      {/* Background - Deep Onyx */}
      <div className="absolute inset-0 z-0 bg-background pointer-events-none" />
      
      <div className="container-luxury relative z-20 mx-auto w-full flex flex-col">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-center lg:items-start">
          
          {/* Left Column (55%) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-30 w-full">
            {/* Label */}
            <motion.div 
              initial={skipAnimations ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: skipAnimations ? 0 : 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <span className="font-accent text-[11px] font-bold tracking-[0.3em] text-accent-gold uppercase mb-2 block">
                Premium Residential Rentals
              </span>
            </motion.div>

            {/* Main Heading (Char Reveal at 0.4s) */}
            <h1 className="mb-8 font-display text-4xl md:text-5xl lg:text-[clamp(3rem,6vw,4.5rem)] font-semibold leading-[1.1] tracking-tighter text-foreground flex flex-wrap gap-x-[0.25em]">
              {animatedWords.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {word.map((item, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={skipAnimations ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ 
                        duration: skipAnimations ? 0 : 0.8, 
                        delay: skipAnimations ? 0 : 0.4 + item.globalIndex * 0.015,
                        ease: [0.25, 0.46, 0.45, 0.94] 
                      }}
                      className="inline-block"
                      style={{ transformOrigin: "bottom" }}
                    >
                      {item.char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Paragraph (0.9s) */}
            <motion.p
              initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: skipAnimations ? 0 : 0.9, duration: 0.8, ease: "easeOut" }}
              className="mb-12 max-w-xl font-accent text-lg md:text-xl text-foreground-secondary leading-relaxed font-light"
            >
              Discover premium apartments, guest houses, and luxury residences across Ranchi's prime locations with flexible rental options, competitive pricing, and professional assistance.
            </motion.p>

            {/* CTAs (0.9s) */}
            <motion.div
              initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: skipAnimations ? 0 : 1.0, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mb-12"
            >
              {/* Primary Button */}
              <BorderGlow
                borderRadius={28}
                borderWidth={3}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/projects"
                  className="relative flex h-14 items-center justify-center rounded-[28px] bg-foreground px-8 font-accent text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] w-full"
                >
                  Browse Properties
                </Link>
              </BorderGlow>

              {/* Secondary Button */}
              <SpecularButton
                className="w-full sm:w-auto"
                size="lg"
                radius={28}
                tint="#c084fc"
                tintOpacity={0}
                blur={0}
                textColor="#000000"
                lineColor="#38bdf8"
                baseColor="#ffffff"
                defaultBorderColor="#000000"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={2}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full gap-2 font-accent text-sm font-medium"
                >
                  <Calendar className="h-4 w-4 text-accent-gold" />
                  Schedule a Visit
                </Link>
              </SpecularButton>
            </motion.div>

            {/* Trust Points (1.1s) */}
            <motion.div 
              initial={skipAnimations ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: skipAnimations ? 0 : 1.1, duration: 0.8 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {[
                "Trusted Builder Network", 
                "Expert Guidance", 
                "End-to-End Support"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-gold" />
                  <span className="font-accent text-[13px] font-medium text-foreground-secondary">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column (45%) */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full h-[400px] lg:h-[650px] flex items-center justify-center mt-8 lg:mt-0">
            
            {/* Layer 2: Radial Circular Gradient */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[120%] h-[120%] rounded-full bg-[radial-gradient(circle,rgba(200,169,106,0.15)_0%,rgba(200,169,106,0)_70%)]" />
            </div>

            {/* Layer 4: Main Building Image (1.4s) */}
            <motion.div
              initial={skipAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: skipAnimations ? 0 : 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: skipAnimations ? 0 : 1.4 }}
              className="relative w-[90%] max-w-[540px] h-[85%] z-20 flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/hero-building.png"
                  alt="Premium Custom Residential Tower"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(200,169,106,0.15)] rounded-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px"
                  priority
                />
              </div>
              
              {/* Layer 5: Ground Shadow */}
              <div className="w-[70%] h-4 bg-black/40 blur-xl rounded-[100%] mt-4" />
            </motion.div>

            {/* Floating Information Cards */}
            <div className="absolute inset-0 z-30 pointer-events-none hidden md:block">
              {/* Card 1: Top Left */}
              <motion.div 
                initial={skipAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                animate={skipAnimations ? { y: [-5, 5, -5] } : { opacity: 1, scale: 1, y: [-5, 5, -5] }}
                transition={{ 
                  opacity: { delay: skipAnimations ? 0 : 1.5, duration: 0.5 },
                  scale: { delay: skipAnimations ? 0 : 1.5, duration: 0.5, type: "spring" },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }
                }}
                className="absolute top-[15%] left-[-5%] glass rounded-xl p-4 flex items-center gap-4"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent-gold/10 text-accent-gold">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-accent text-sm font-bold text-foreground">Trusted</span>
                  <span className="font-accent text-xs text-foreground-secondary">Builders</span>
                </div>
              </motion.div>

              {/* Card 2: Bottom Left */}
              <motion.div 
                initial={skipAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                animate={skipAnimations ? { y: [-4, 4, -4] } : { opacity: 1, scale: 1, y: [-4, 4, -4] }}
                transition={{ 
                  opacity: { delay: skipAnimations ? 0 : 1.6, duration: 0.5 },
                  scale: { delay: skipAnimations ? 0 : 1.6, duration: 0.5, type: "spring" },
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute bottom-[25%] left-[-10%] glass rounded-xl p-4 flex items-center gap-4"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent-gold/10 text-accent-gold">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-accent text-sm font-bold text-foreground">Expert</span>
                  <span className="font-accent text-xs text-foreground-secondary">Guidance</span>
                </div>
              </motion.div>

              {/* Card 3: Top Right */}
              <motion.div 
                initial={skipAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                animate={skipAnimations ? { y: [-6, 6, -6] } : { opacity: 1, scale: 1, y: [-6, 6, -6] }}
                transition={{ 
                  opacity: { delay: skipAnimations ? 0 : 1.7, duration: 0.5 },
                  scale: { delay: skipAnimations ? 0 : 1.7, duration: 0.5, type: "spring" },
                  y: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute top-[25%] right-[-5%] glass rounded-xl p-4 flex items-center gap-4"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent-gold/10 text-accent-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-accent text-sm font-bold text-foreground">Best</span>
                  <span className="font-accent text-xs text-foreground-secondary">Locations</span>
                </div>
              </motion.div>

              {/* Card 4: Bottom Right */}
              <motion.div 
                initial={skipAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                animate={skipAnimations ? { y: [-5, 5, -5] } : { opacity: 1, scale: 1, y: [-5, 5, -5] }}
                transition={{ 
                  opacity: { delay: skipAnimations ? 0 : 1.8, duration: 0.5 },
                  scale: { delay: skipAnimations ? 0 : 1.8, duration: 0.5, type: "spring" },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                }}
                className="absolute bottom-[15%] right-[-2%] glass rounded-xl p-4 flex items-center gap-4"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent-gold/10 text-accent-gold">
                  <Tag className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-accent text-sm font-bold text-foreground">Best</span>
                  <span className="font-accent text-xs text-foreground-secondary">Deals</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Search Bar & Stats - Moved below the main grid to span full width */}
        <motion.div 
          initial={skipAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: skipAnimations ? 0 : 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: skipAnimations ? 0 : 1.8 }}
          className="mt-12 w-full flex flex-col items-center gap-10 relative z-40"
        >
          <HeroStats />
        </motion.div>
      </div>
    </section>
  );
}
