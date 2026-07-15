import { ClipboardList, Search, Eye, Key } from "lucide-react";
import { SectionHeader, ScrollReveal, GlassCard } from "@/components/shared";

export function HowWeWork() {
  const steps = [
    {
      icon: Search,
      title: "1. Discovery & Consultation",
      description: "We start by understanding your specific requirements, budget, and lifestyle preferences to narrow down the perfect properties.",
    },
    {
      icon: Eye,
      title: "2. Curated Site Visits",
      description: "We arrange exclusive viewings of shortlisted properties, providing unbiased insights on each developer and project.",
    },
    {
      icon: ClipboardList,
      title: "3. Negotiation & Documentation",
      description: "Our experts negotiate the best possible price and handle all legal documentation, ensuring a smooth, transparent process.",
    },
    {
      icon: Key,
      title: "4. Handover & Beyond",
      description: "We assist with home loans, registration, and final handover. Our relationship continues long after you get the keys.",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container-luxury relative z-10">
        <SectionHeader
          overline="The Buying Process"
          title="How We Work"
          subtitle="A seamless, transparent journey to finding your dream home with end-to-end expert assistance."
          alignment="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal
                key={step.title}
                direction="up"
                delay={0.1 * (index + 1)}
                duration={0.6}
                className="relative"
              >
                {/* Connecting line for desktop */}
                {index !== steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-accent-gold/50 to-transparent z-0" />
                )}
                
                <GlassCard hover className="h-full relative z-10 border-border/50 bg-background pt-10">
                  <div className="absolute -top-6 left-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold text-background shadow-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 font-display text-lg font-medium text-foreground mt-4">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-secondary">
                    {step.description}
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
