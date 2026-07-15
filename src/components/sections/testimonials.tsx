"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeader, ScrollReveal, GlassCard } from "@/components/shared";
import { testimonials } from "@/data/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="container-luxury relative z-10">
        <SectionHeader
          overline="Client Experiences"
          title="Words of Appreciation"
          subtitle="Discover what our residents have to say about living the Shivaay Realty lifestyle."
          alignment="center"
        />

        <ScrollReveal direction="up" delay={0.2} duration={0.8}>
          <div className="mx-auto max-w-5xl mt-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-8">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/2">
                    <div className="p-1 h-full">
                      <GlassCard className="h-full flex flex-col justify-between p-8 border-border/40 hover:border-accent-gold/40 transition-colors duration-500">
                        <div>
                          <div className="mb-6 flex items-center justify-between">
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating
                                      ? "fill-accent-gold text-accent-gold"
                                      : "fill-muted text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <Quote className="h-8 w-8 text-accent-gold/20" />
                          </div>
                          <p className="text-foreground-secondary leading-relaxed text-sm md:text-base italic mb-8">
                            &quot;{testimonial.testimonial}&quot;
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold font-display font-medium text-lg">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-accent font-medium text-foreground tracking-wide">
                              {testimonial.name}
                            </h4>
                            <p className="text-xs text-foreground-muted mt-0.5">
                              {testimonial.designation} • {testimonial.project}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border-accent-gold/30 bg-background/50 hover:bg-accent-gold hover:text-background text-foreground transition-all duration-300" />
                <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border-accent-gold/30 bg-background/50 hover:bg-accent-gold hover:text-background text-foreground transition-all duration-300" />
              </div>
            </Carousel>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Background gradients */}
      <div className="pointer-events-none absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full bg-accent-gold/5 blur-[150px] translate-x-1/2 translate-y-1/2" />
    </section>
  );
}
