"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/shared";
import { PropertyCard } from "@/components/property";
import { propertyService } from "@/services/property-service";
import { PropertyCardData } from "@/types";

export function FeaturedProjects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await propertyService.getFeaturedProperties();
        setProperties(data);
      } catch (error) {
        // Ignore error
      } finally {
        setIsLoading(false);
      }
    };
    loadProperties();
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate the horizontal translation based on number of items
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <div ref={targetRef}>
      {isLoading ? (
        <section className="relative py-24 bg-background flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
        </section>
      ) : (
        <>
          {/* Desktop Version: Horizontal Scroll-Jack */}
          {isDesktop && (
            <section className="relative h-[400vh] bg-background">
              <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-16">
                
                {/* Header - Stays fixed while scrolling horizontally */}
                <div className="container-luxury relative z-20 mx-auto w-full mb-12">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                    <SectionHeader
                      overline="Curated Portfolio"
                      title="Featured Properties"
                      subtitle="Explore premium properties from top developers across prime locations."
                      alignment="left"
                      className="mb-6 md:mb-0"
                    />
                    
                    <Link
                      href="/projects"
                      className="group inline-flex items-center gap-2 font-accent text-sm font-medium tracking-wider uppercase text-accent-gold transition-colors hover:text-foreground"
                    >
                      View All Properties
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Horizontal Strip */}
                <motion.div 
                  style={{ x }} 
                  className="flex gap-8 px-6 md:px-8 xl:px-[calc((100vw-1280px)/2+2rem)] w-[max-content] relative z-10"
                >
                  {properties.map((property, index) => (
                    <div key={property.id} className="w-[85vw] md:w-[500px] lg:w-[600px] shrink-0 h-full">
                      <PropertyCard property={property as any} priority={index === 0} />
                    </div>
                  ))}
                  
                  {/* End cap / view all card */}
                  <div className="w-[85vw] md:w-[400px] shrink-0 flex items-center justify-center p-4">
                    <div className="glass flex flex-col items-center justify-center h-full min-h-[400px] w-full rounded-2xl border border-border/40 hover:border-accent-gold/40 transition-colors p-8 text-center bg-background/50">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold mb-6 transition-transform group-hover:scale-110">
                        <ArrowRight className="h-8 w-8" />
                      </div>
                      <h3 className="font-display text-2xl font-medium text-foreground mb-4">View Full Portfolio</h3>
                      <p className="text-foreground-secondary mb-8">Discover our complete collection of premium properties.</p>
                      <Link
                        href="/projects"
                        className="group inline-flex h-12 items-center justify-center rounded-xl bg-black px-8 font-accent text-sm font-medium text-white transition-transform duration-100 hover:-translate-y-1 active:scale-[0.98] shadow-lg w-full"
                      >
                        Explore Properties
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Background gradient blur */}
                <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-[120px] z-0" />
              </div>
            </section>
          )}

          {/* Mobile Version: Vertical Stack */}
          {!isDesktop && (
            <section className="relative py-24 bg-background">
              <div className="container-luxury relative z-20 mx-auto w-full">
                <div className="mb-12">
                  <SectionHeader
                    overline="Curated Portfolio"
                    title="Featured Properties"
                    subtitle="Explore premium properties from top developers across prime locations."
                    alignment="left"
                  />
                </div>

                <div className="flex flex-col gap-8">
                  {properties.map((property, index) => (
                    <div key={property.id} className="w-full">
                      <PropertyCard property={property as any} priority={index === 0} />
                    </div>
                  ))}
                  
                  <Link
                    href="/projects"
                    className="group inline-flex h-14 items-center justify-center rounded-xl bg-black px-8 font-accent text-sm font-medium text-white transition-transform duration-100 active:scale-[0.98] shadow-lg w-full mt-4"
                  >
                    View All Properties
                  </Link>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
