import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader, ScrollReveal } from "@/components/shared";
import { PropertyCard } from "@/components/property";
import { featuredProperties } from "@/data/properties";

export function FeaturedProjects() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxury relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <SectionHeader
            overline="Curated Portfolio"
            title="Featured Properties"
            subtitle="Explore premium properties from top developers across prime locations."
            alignment="left"
            className="mb-6 md:mb-0"
          />
          
          <ScrollReveal direction="up" delay={0.3}>
            <Link
              href="/projects"
              className="group hidden md:inline-flex items-center gap-2 font-accent text-sm font-medium tracking-wider uppercase text-accent-gold transition-colors hover:text-white"
            >
              View All Properties
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property, index) => (
            <ScrollReveal
              key={property.id}
              direction="up"
              delay={0.1 * (index + 1)}
              duration={0.7}
            >
              <PropertyCard property={property} priority={index === 0} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={0.4} className="mt-12 flex justify-center md:hidden">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-accent text-sm font-medium tracking-wider uppercase text-accent-gold transition-colors hover:text-white"
          >
            View All Properties
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
      
      {/* Background gradient blur */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-[120px]" />
    </section>
  );
}
