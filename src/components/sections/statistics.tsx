"use client";

import { useEffect, useState, useRef } from "react";
import { Building2, Users, Maximize2, Award } from "lucide-react";
import { useIntersection } from "@/hooks/use-intersection";
import { statistics } from "@/data/statistics";
import { motion, useInView, animate } from "framer-motion";

function Counter({ from, to, isInView, delay }: { from: number; to: number; isInView: boolean; delay: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(from, to, {
      duration: 2,
      delay: delay,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.round(value).toString();
        }
      },
    });

    return () => controls.stop();
  }, [from, to, isInView, delay]);

  return <span ref={nodeRef}>{from}</span>;
}

export function Statistics() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Icon mapping
  const icons = {
    Building2,
    Users,
    Maximize2,
    Award,
  };

  return (
    <section 
      ref={ref} 
      className="relative border-y border-border bg-background py-24"
    >
      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-16 items-center">
          {statistics.map((stat, index) => {
            const Icon = icons[stat.icon as keyof typeof icons] || Building2;
            const isHeroStat = index === 0;
            
            return (
              <div 
                key={stat.id}
                className={`flex flex-col relative transition-all duration-700 ${
                  isHeroStat 
                    ? "col-span-2 lg:col-span-2 text-left lg:pr-12 lg:border-r border-border" 
                    : "col-span-1 lg:col-span-1 items-center text-center"
                }`}
                style={{ 
                  opacity: isInView ? 1 : 0, 
                  transform: isInView ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Number & Icon Container */}
                <div className={`flex ${isHeroStat ? 'items-end gap-6' : 'flex-col items-center'} mb-4 w-full`}>
                  {isHeroStat && (
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold shrink-0">
                      <Icon className="h-8 w-8" />
                    </div>
                  )}
                  
                  {!isHeroStat && (
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/5 text-accent-gold transition-transform hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                  )}

                  <div className={`flex items-baseline font-display text-foreground ${
                    isHeroStat ? 'text-6xl md:text-7xl tracking-tighter' : 'text-4xl md:text-5xl'
                  }`}>
                    <Counter 
                      from={0} 
                      to={stat.value} 
                      isInView={isInView}
                      delay={index * 0.15}
                    />
                    <span className="text-accent-gold">{stat.suffix}</span>
                  </div>
                </div>
                
                {/* Horizontal Progress Bar */}
                <div className={`h-[3px] bg-accent-gold/10 overflow-hidden mb-4 ${isHeroStat ? 'w-full max-w-[200px]' : 'w-16'}`}>
                  <motion.div 
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 2, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full bg-accent-gold"
                  />
                </div>

                <p className={`font-accent text-xs tracking-widest text-foreground-secondary uppercase ${isHeroStat ? 'max-w-[200px]' : ''}`}>
                  {stat.label}
                </p>
                
                {isHeroStat && stat.description && (
                  <p className="mt-4 text-sm text-foreground-muted max-w-sm hidden md:block">
                    {stat.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-gold/[0.02] to-transparent pointer-events-none" />
    </section>
  );
}
