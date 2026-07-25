"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { ScrollReveal } from "@/components/shared";
import { SITE_CONFIG } from "@/data/navigation";
import { founderData as founder } from "@/data/founder";

export function Founder() {
  if (!founder) {
    return null;
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image Side */}
          <ScrollReveal direction="right" duration={0.8} className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-accent-gold/10 translate-x-4 translate-y-4 rounded-xl -z-10" />
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-border/50 shadow-xl bg-background-secondary flex items-center justify-center">
              {founder.photo_url ? (
                <Image
                  src={founder.photo_url}
                  alt={founder.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground-muted bg-background-tertiary">
                  <span className="relative z-10 overline text-accent-gold mt-4 bg-background/80 px-4 py-1 rounded-full backdrop-blur-sm">Photo Unavailable</span>
                </div>
              )}
            </div>
            
            <div className="absolute -bottom-8 -right-8 glass-heavy p-6 rounded-xl border border-accent-gold/20 shadow-gold max-w-[240px]">
              <Quote className="h-8 w-8 text-accent-gold mb-3 opacity-50" />
              <p className="font-accent text-sm text-foreground italic leading-relaxed">
                "Real estate is more than transactions; it's about building trust and finding the perfect lifestyle for our clients."
              </p>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal direction="left" duration={0.8} className="flex flex-col justify-center mt-12 lg:mt-0">
            <span className="overline mb-4 text-accent-gold">Meet The Founder</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4">
              {founder.name}
            </h2>
            <h3 className="font-accent text-lg text-foreground-secondary tracking-wide mb-8">
              {founder.designation}, {SITE_CONFIG.name}
            </h3>

            <div className="prose prose-invert prose-gold max-w-none space-y-6">
              <p className="text-foreground-secondary leading-relaxed whitespace-pre-wrap">
                {founder.bio}
              </p>
              
              <div className="pt-6 border-t border-border/50">
                <p className="font-display text-lg italic text-foreground">
                  "Our goal isn't just to close a deal. Our goal is to ensure you wake up every day loving the home you've chosen."
                </p>
              </div>
              
              {/* Signature placeholder */}
              <div className="pt-8 flex justify-between items-center">
                <div className="font-display text-3xl text-foreground-muted opacity-50 italic">
                  {founder.name.split(' ').map(n => n[0]).join('. ')}.
                </div>
                
                <div className="flex gap-4">
                  {founder.linkedin && (
                    <a href={founder.linkedin} target="_blank" rel="noreferrer" className="text-foreground-muted hover:text-accent-gold transition-colors">
                      LinkedIn
                    </a>
                  )}
                  {founder.instagram && (
                    <a href={founder.instagram} target="_blank" rel="noreferrer" className="text-foreground-muted hover:text-accent-gold transition-colors">
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
