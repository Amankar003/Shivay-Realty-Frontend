import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/shared";
import { SITE_CONFIG } from "@/data/navigation";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden border-t border-border bg-background-secondary/50">
      <div className="container-luxury relative z-10">
        <div className="mx-auto max-w-4xl rounded-3xl overflow-hidden relative">
          
          {/* Background image for the CTA card */}
          <div 
            className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            }}
          />
          
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/90 to-background/50" />
          
          <div className="relative z-20 flex flex-col p-8 md:p-16">
            <ScrollReveal direction="up" duration={0.6}>
              <span className="overline text-accent-gold mb-4 block">Take the next step</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground leading-tight mb-6 max-w-xl">
                Ready to find your perfect luxury home?
              </h2>
              <p className="text-foreground-secondary text-lg mb-10 max-w-lg leading-relaxed">
                Schedule a private viewing with our luxury real estate advisors and experience the Shivaay standard of living.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact#site-visit"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent-gold px-8 py-4 font-accent text-sm font-medium tracking-wider text-background uppercase transition-transform hover:scale-[1.02] active:scale-95 shadow-gold w-full sm:w-auto"
                >
                  Book a Site Visit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-accent-gold/50 bg-background/50 backdrop-blur-md px-8 py-4 font-accent text-sm font-medium tracking-wider text-foreground uppercase transition-all hover:bg-accent-gold hover:text-background hover:border-accent-gold w-full sm:w-auto"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
