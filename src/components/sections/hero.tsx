"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Calendar, Shield, User, MapPin, Tag } from "lucide-react";
import { HeroSearch, HeroStats } from "@/components/sections";

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[100svh] flex items-center bg-white overflow-hidden pt-28 pb-32 lg:pb-48">
      
      {/* Background - Layer 1 is pure white bg-white */}
      
      <div className="container-luxury relative z-20 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column (55%) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left pt-10 z-30"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="font-accent text-[11px] font-bold tracking-[0.25em] text-[#C8A96A] uppercase">
                Your Trusted Real Estate Partner
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="mb-6 font-display text-5xl md:text-6xl lg:text-[4.5rem] font-medium leading-[1.1] tracking-tight text-[#111111]"
            >
              Find The Right Property. <br />
              Buy With Confidence.
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={itemVariants}
              className="mb-12 max-w-lg font-accent text-lg text-[#666666] leading-[1.8]"
            >
              We connect buyers with trusted builders and help them discover premium residential and commercial properties.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mb-12"
            >
              {/* Primary Button */}
              <Link
                href="/projects"
                className="group inline-flex h-14 items-center justify-center rounded-xl bg-[#111111] px-8 font-accent text-sm font-medium text-white transition-colors hover:bg-[#C8A96A] w-full sm:w-auto"
              >
                Explore Properties
              </Link>

              {/* Secondary Button */}
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center justify-center rounded-xl border border-[#ECECEC] bg-white px-8 font-accent text-sm font-medium text-[#111111] transition-colors hover:bg-[#C8A96A]/10 w-full sm:w-auto gap-2"
              >
                <Calendar className="h-4 w-4 text-[#C8A96A]" />
                Book Free Consultation
              </Link>
            </motion.div>

            {/* Trust Points */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                "Trusted Builder Network", 
                "Expert Guidance", 
                "End-to-End Support"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#C8A96A]" />
                  <span className="font-accent text-[13px] font-medium text-[#666666]">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column (45%) */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full h-[600px] lg:h-[750px] flex items-center justify-center mt-10 lg:mt-0">
            
            {/* Layer 2: Radial Circular Gradient */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[120%] h-[120%] rounded-full bg-[radial-gradient(circle,rgba(247,243,237,0.8)_0%,rgba(255,255,255,0)_70%)]" />
            </div>

            {/* Layer 3: Skyline Silhouette */}
            <div className="absolute bottom-10 left-0 w-full h-[40%] opacity-[0.03] blur-[1px] pointer-events-none overflow-hidden flex items-end justify-center">
              {/* Using a highly faded SVG pattern/image to simulate a skyline */}
              <div 
                className="w-[150%] h-full bg-bottom bg-contain bg-repeat-x" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`, filter: 'grayscale(100%) contrast(200%)' }}
              />
            </div>

            {/* Layer 6: Small Birds */}
            <div className="absolute top-[10%] right-[20%] w-32 h-20 opacity-40 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#111111]">
                <path d="M10,30 Q15,25 20,30 Q15,32 10,30 Z" className="animate-[pulse_3s_ease-in-out_infinite]" />
                <path d="M30,20 Q35,15 40,20 Q35,22 30,20 Z" className="animate-[pulse_4s_ease-in-out_infinite_1s]" />
                <path d="M50,35 Q55,30 60,35 Q55,37 50,35 Z" className="animate-[pulse_3.5s_ease-in-out_infinite_0.5s]" />
                <path d="M70,15 Q75,10 80,15 Q75,17 70,15 Z" className="animate-[pulse_4.5s_ease-in-out_infinite_1.5s]" />
                <path d="M85,40 Q90,35 95,40 Q90,42 85,40 Z" className="animate-[pulse_3s_ease-in-out_infinite_2s]" />
              </svg>
            </div>

            {/* Layer 4: Main Building Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="relative w-[90%] max-w-[540px] h-[85%] z-20 flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/hero-building.png"
                  alt="Premium Custom Residential Tower"
                  fill
                  className="object-contain mix-blend-multiply drop-shadow-2xl rounded-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px"
                  priority
                />
              </div>
              
              {/* Layer 5: Ground Shadow */}
              <div className="w-[70%] h-4 bg-black/10 blur-xl rounded-[100%] mt-4" />
            </motion.div>

            {/* Floating Information Cards */}
            <div className="absolute inset-0 z-30 pointer-events-none hidden md:block">
              {/* Card 1: Top Left */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                className="absolute top-[15%] left-[-5%] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#ECECEC] p-4 flex items-center gap-4"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#F7F3ED] text-[#C8A96A]">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-accent text-sm font-bold text-[#111111]">Trusted</span>
                  <span className="font-accent text-xs text-[#666666]">Builders</span>
                </div>
              </motion.div>

              {/* Card 2: Bottom Left */}
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[25%] left-[-10%] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#ECECEC] p-4 flex items-center gap-4"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#F7F3ED] text-[#C8A96A]">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-accent text-sm font-bold text-[#111111]">Expert</span>
                  <span className="font-accent text-xs text-[#666666]">Guidance</span>
                </div>
              </motion.div>

              {/* Card 3: Top Right */}
              <motion.div 
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[25%] right-[-5%] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#ECECEC] p-4 flex items-center gap-4"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#F7F3ED] text-[#C8A96A]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-accent text-sm font-bold text-[#111111]">Best</span>
                  <span className="font-accent text-xs text-[#666666]">Locations</span>
                </div>
              </motion.div>

              {/* Card 4: Bottom Right */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[15%] right-[-2%] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-[#ECECEC] p-4 flex items-center gap-4"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#F7F3ED] text-[#C8A96A]">
                  <Tag className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-accent text-sm font-bold text-[#111111]">Best</span>
                  <span className="font-accent text-xs text-[#666666]">Deals</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Search Bar & Stats - Moved below the main grid to span full width */}
        <div className="mt-10 md:mt-24 w-full flex flex-col items-center gap-12 relative z-40">
          <HeroSearch />
          <HeroStats />
        </div>
      </div>
    </section>
  );
}

