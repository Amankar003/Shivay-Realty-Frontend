import Image from "next/image";
import { ScrollReveal, SectionHeader } from "@/components/shared";
import { SITE_CONFIG } from "@/data/navigation";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col">
            <ScrollReveal direction="up" duration={0.6}>
              <span className="overline text-accent-gold mb-6 block">Our Story</span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] tracking-tight mb-8">
                About <br />
                <span className="text-gradient-gold italic pr-2">Shivaay Realty</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} duration={0.6}>
              <p className="text-lg md:text-xl text-foreground-secondary leading-relaxed mb-8 max-w-lg">
                Shivaay Realty specializes in premium residential rental solutions in Ranchi. We provide carefully selected apartments, guest houses, luxury residences, and family homes located in prime neighborhoods.
              </p>
              <p className="text-base text-foreground-muted leading-relaxed max-w-lg">
                Whether you're a working professional, a family, or searching for long-term accommodation, we help you find comfortable, secure, and modern rental homes that suit your lifestyle and budget.
              </p>
            </ScrollReveal>
          </div>

          {/* Image Collage */}
          <div className="relative h-[500px] md:h-[600px] w-full">
            <ScrollReveal direction="left" delay={0.3} className="absolute top-0 right-0 w-3/4 h-[70%] z-10">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <Image
                  src="/images/photo-1600596542815-ffad4c1539a9.jpg"
                  alt="Luxury Architecture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-accent-gold/10 mix-blend-overlay" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5} className="absolute bottom-0 left-0 w-2/3 h-[50%] z-20">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
                <Image
                  src="/images/photo-1600607687920-4e2a09cf159d.jpg"
                  alt="Luxury Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
            
            {/* Decorative Element */}
            <ScrollReveal direction="none" delay={0.7} className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 z-30">
              <div className="w-24 h-24 rounded-full border border-accent-gold/30 backdrop-blur-md bg-background/50 flex items-center justify-center animate-spin-slow">
                <span className="font-accent text-[10px] uppercase tracking-widest text-accent-gold text-center leading-tight">
                  Est. 2005
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
    </section>
  );
}
