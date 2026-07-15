import { Target, Compass } from "lucide-react";
import { ScrollReveal, GlassCard } from "@/components/shared";

export function VisionMission() {
  return (
    <section className="py-20 md:py-32 bg-background-secondary/30 border-y border-border">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Vision */}
          <ScrollReveal direction="up" duration={0.6}>
            <GlassCard hover className="h-full border-border/50 bg-background/60 p-8 md:p-12">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-gold/10 text-accent-gold border border-accent-gold/20">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="mb-4 font-display text-3xl font-medium text-foreground">
                Our Vision
              </h3>
              <p className="text-foreground-secondary leading-relaxed text-lg">
                To be the most trusted luxury real estate consultancy in India, recognized for our commitment to transparency, personalized advisory, and connecting clients with iconic properties that elevate their lifestyle.
              </p>
            </GlassCard>
          </ScrollReveal>

          {/* Mission */}
          <ScrollReveal direction="up" delay={0.2} duration={0.6}>
            <GlassCard hover className="h-full border-border/50 bg-background/60 p-8 md:p-12">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-gold/10 text-accent-gold border border-accent-gold/20">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mb-4 font-display text-3xl font-medium text-foreground">
                Our Mission
              </h3>
              <p className="text-foreground-secondary leading-relaxed text-lg">
                To guide our clients through a seamless property buying journey by offering unbiased expert advice, partnering with the nation's most reliable developers, and ensuring end-to-end assistance with zero hidden costs.
              </p>
            </GlassCard>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
