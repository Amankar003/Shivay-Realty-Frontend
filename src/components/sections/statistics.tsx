"use client";

import { useEffect, useState } from "react";
import { Building2, Users, Maximize2, Award } from "lucide-react";
import { useIntersection } from "@/hooks/use-intersection";
import { statistics } from "@/data/statistics";

export function Statistics() {
  const [ref, isInView] = useIntersection<HTMLDivElement>({ threshold: 0.2 });
  
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
      className="relative border-y border-border bg-background py-20"
    >
      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-8">
          {statistics.map((stat, index) => {
            const Icon = icons[stat.icon as keyof typeof icons] || Building2;
            
            return (
              <div 
                key={stat.id}
                className="flex flex-col items-center text-center transition-all duration-700"
                style={{ 
                  opacity: isInView ? 1 : 0, 
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold">
                  <Icon className="h-6 w-6" />
                </div>
                
                <div className="mb-2 flex items-baseline justify-center font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
                  {/* Pseudo-animated counter (CSS implementation for simpler React code) */}
                  <span 
                    className="tabular-nums transition-all duration-[2000ms] ease-out"
                    style={{
                      opacity: isInView ? 1 : 0,
                    }}
                  >
                    {isInView ? stat.value : 0}
                  </span>
                  <span className="text-accent-gold">{stat.suffix}</span>
                </div>
                
                <p className="font-accent text-xs tracking-widest text-foreground-secondary uppercase">
                  {stat.label}
                </p>
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
