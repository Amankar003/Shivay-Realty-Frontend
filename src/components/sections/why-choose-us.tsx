import { Shield, Diamond, Map, Clock, Award, Users } from "lucide-react";
import { SectionHeader, ScrollReveal, GlassCard } from "@/components/shared";

export function WhyChooseUs() {
  const usps = [
    {
      icon: Map,
      title: "Prime Locations",
      description: "We curate properties in the most coveted neighborhoods across Ranchi, offering unmatched connectivity.",
    },
    {
      icon: Clock,
      title: "Flexible Rental Plans",
      description: "Customized rental agreements designed to suit your schedule, whether short-term or long-term.",
    },
    {
      icon: Diamond,
      title: "Luxury Apartments",
      description: "High-quality, modern, and comfortable residences for a premium lifestyle.",
    },
    {
      icon: Award,
      title: "Competitive Prices",
      description: "Transparent pricing with zero hidden costs to ensure you get the best value for your rent.",
    },
    {
      icon: Shield,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is always available to address your maintenance and rental queries.",
    },
    {
      icon: Users,
      title: "Professional Assistance",
      description: "Expert guidance from property discovery to easy rental agreement signing.",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-background-secondary/30">
      {/* Top and bottom subtle borders */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-luxury relative z-10">
        <SectionHeader
          overline="The Shivaay Promise"
          title="Why Choose Us"
          subtitle="A legacy built on trust, innovation, and an unwavering commitment to excellence."
          alignment="center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <ScrollReveal
                key={usp.title}
                direction="up"
                delay={0.1 * (index + 1)}
                duration={0.6}
              >
                <GlassCard hover className="h-full border-border/50 bg-background/50">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold border border-accent-gold/20 shadow-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-display text-xl font-medium text-foreground">
                    {usp.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-secondary">
                    {usp.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
