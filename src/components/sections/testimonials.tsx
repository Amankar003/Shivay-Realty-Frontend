"use client";

import { Star, Quote, Play } from "lucide-react";
import { SectionHeader, ScrollReveal } from "@/components/shared";
import { testimonials } from "@/data/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

export function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Fallback videos for the premium proof moment
  const bgVideos = [
    "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-living-room-and-kitchen-41852-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-woman-walking-in-a-beautiful-modern-house-41851-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-modern-kitchen-in-a-beautiful-house-41853-large.mp4"
  ];

  return (
    <section className="dark relative py-24 md:py-32 overflow-hidden bg-background text-foreground transition-colors duration-500">
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
                {testimonials.map((testimonial, idx) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/2">
                    <div className="p-1 h-full h-[500px]">
                      <div 
                        className="relative h-full flex flex-col justify-between p-8 overflow-hidden rounded-2xl transition-all duration-500 group border border-border/40 hover:border-accent-gold/40"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {/* Video Background */}
                        <div className="absolute inset-0 z-0">
                          <video
                            src={bgVideos[idx % bgVideos.length]}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={`w-full h-full object-cover transition-transform duration-1000 ${hoveredIndex === idx ? 'scale-105' : 'scale-100'}`}
                          />
                          <div className={`absolute inset-0 transition-colors duration-500 ${hoveredIndex === idx ? 'bg-background/70' : 'bg-background/85'}`} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="mb-6 flex items-center justify-between">
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating
                                      ? "fill-accent-gold text-accent-gold"
                                      : "fill-foreground-muted text-foreground-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <Quote className="h-8 w-8 text-accent-gold/40" />
                          </div>
                          
                          <p className="font-display text-foreground leading-relaxed text-xl md:text-2xl mb-8">
                            &quot;{testimonial.testimonial}&quot;
                          </p>
                        </div>
                        
                        <div className="relative z-10 flex items-center justify-between border-t border-border/30 pt-6">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/20 text-accent-gold font-display font-medium text-lg backdrop-blur-sm border border-accent-gold/30">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-accent font-medium text-foreground tracking-wide">
                                {testimonial.name}
                              </h4>
                              <p className="text-xs text-foreground-secondary mt-0.5">
                                {testimonial.designation} • {testimonial.project}
                              </p>
                            </div>
                          </div>

                          {/* Play Icon - Only visible on hover */}
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/90 text-background transition-all duration-300 transform ${hoveredIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                            <Play className="h-4 w-4 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-4 mt-8 relative z-20">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border-accent-gold/30 bg-background/50 hover:bg-accent-gold hover:text-background text-foreground transition-all duration-300" />
                <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border-accent-gold/30 bg-background/50 hover:bg-accent-gold hover:text-background text-foreground transition-all duration-300" />
              </div>
            </Carousel>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
