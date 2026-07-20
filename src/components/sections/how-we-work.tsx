"use client";

import { useRef, useEffect, useState } from "react";
import { ClipboardList, Search, Eye, Key } from "lucide-react";
import { SectionHeader } from "@/components/shared";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    title: "1. Discovery & Consultation",
    description: "Your journey begins with a detailed consultation. We take the time to understand your unique lifestyle, preferred neighborhoods in Ranchi, budget constraints, and specific amenity requirements. Our experts then filter through our premium inventory to shortlist properties that perfectly align with your vision.",
    color: "from-blue-500/10 to-transparent",
    image: "/images/photo-1512917774080-9991f1c4c750.jpg",
  },
  {
    icon: Eye,
    title: "2. Curated Site Visits",
    description: "Once we have a curated list, we arrange exclusive, guided viewings at your convenience. Our local area experts accompany you to each property, providing insights into the neighborhood's security, nearby schools, hospitals, and future development plans to help you make an informed decision.",
    color: "from-purple-500/10 to-transparent",
    image: "/images/photo-1600596542815-ffad4c1539a9.jpg",
  },
  {
    icon: ClipboardList,
    title: "3. Agreement & Documentation",
    description: "We believe in complete transparency. Our legal team handles all the heavy lifting, ensuring that your rental agreements are fair, compliant, and clearly outlined. From negotiating terms with the landlord to finalizing the deposit, we make the paperwork process seamless and stress-free.",
    color: "from-emerald-500/10 to-transparent",
    image: "/images/photo-1560250097-0b93528c311a.jpg",
  },
  {
    icon: Key,
    title: "4. Move-in & Beyond",
    description: "Welcome to your new home! We assist with the handover process and ensure the property is in pristine condition before you move in. But our relationship doesn't end there—our 24/7 dedicated tenant support remains available for any maintenance requests, lease renewals, or general queries.",
    color: "from-accent-gold/20 to-transparent",
    image: "/images/photo-1600585154340-be6161a56a0c.jpg",
  },
];

interface CardProps {
  step: typeof steps[0];
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({ step, index, progress, range, targetScale }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const Icon = step.icon;

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-10vh + ${index * 30}px)` }} 
        className={cn(
          "relative flex flex-col md:flex-row items-center gap-8 lg:gap-16 w-full max-w-5xl mx-auto p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem]",
          "glass-heavy border border-border shadow-2xl origin-top"
        )}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-br opacity-50 rounded-[inherit] pointer-events-none" />
        
        <div className="relative z-10 flex-1 flex flex-col gap-6 md:pr-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-gold text-background shadow-gold">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-foreground tracking-tight">
            {step.title}
          </h3>
          <p className="text-lg md:text-xl leading-relaxed text-foreground-secondary font-light">
            {step.description}
          </p>
        </div>

        {/* Graphic representing the step */}
        <div className="relative z-10 w-full md:w-[40%] aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden glass border border-white/20 hidden md:flex items-center justify-center">
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-background-secondary to-background">
            <Image
              src={step.image}
              alt={step.title}
              fill
              className="object-cover opacity-90 transition-opacity hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            {/* Overlay icon in corner */}
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/10 z-20">
              <Icon className="w-8 h-8 text-accent-gold" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export function HowWeWork() {
  const container = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="relative bg-background pt-24 md:pt-32">
      {/* Title Section - Stays fixed behind cards */}
      <div className="sticky top-32 w-full flex flex-col items-center justify-start px-6 z-0 mb-[10vh]">
        <SectionHeader
          overline="The Rental Process"
          title="How We Work"
          subtitle="A seamless, transparent journey to finding your dream rental home with end-to-end expert assistance."
          alignment="center"
        />
      </div>

      {/* Cards Section */}
      <div className="relative z-10 pb-[20vh] px-4 md:px-6">
        {steps.map((step, index) => {
          const targetScale = 1 - ( (steps.length - index) * 0.05 );
          return (
            <Card
              key={index}
              index={index}
              step={step}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
