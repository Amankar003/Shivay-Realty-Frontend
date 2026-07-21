"use client";

import { useState, useMemo, useEffect } from "react";
import { PropertyCard, PropertyFilters } from "@/components/property";
import { SectionHeader, ScrollReveal } from "@/components/shared";
import { propertyService } from "@/services/property-service";
import type { PropertyType, PropertyStatus, PropertyCardData } from "@/types";

export function ProjectsList() {
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    type: "all" as PropertyType | "all",
    status: "all" as PropertyStatus | "all",
    city: "all",
    search: "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getProperties();
        setProperties(data.items);
      } catch (error) {
        console.error("Failed to load properties", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Extract unique cities
  const cities = useMemo(() => {
    const uniqueCities = new Set(properties.map(p => p.city));
    return Array.from(uniqueCities).sort();
  }, [properties]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = !filters.search || 
        property.title.toLowerCase().includes(searchLower) || 
        property.location.toLowerCase().includes(searchLower) ||
        property.city.toLowerCase().includes(searchLower);

      // Type filter
      const matchesType = filters.type === "all" || property.propertyType === filters.type;
      
      // Status filter
      const matchesStatus = filters.status === "all" || property.status === filters.status;
      
      // City filter
      const matchesCity = filters.city === "all" || property.city === filters.city;

      return matchesSearch && matchesType && matchesStatus && matchesCity;
    });
  }, [filters, properties]);

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 min-h-screen bg-background">
      <div className="container-luxury relative z-10">
        <div className="mb-12">
          <SectionHeader
            overline="Our Portfolio"
            title="Discover Luxury"
            subtitle="Explore our curated collection of India's finest real estate properties."
            alignment="left"
          />
        </div>

        <PropertyFilters onFilterChange={setFilters} cities={cities} />

        {/* Results Count */}
        <div className="mb-6 font-accent text-sm text-foreground-secondary">
          Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <ScrollReveal
                key={property.id}
                direction="up"
                delay={(index % 3) * 0.1}
                duration={0.6}
              >
                <PropertyCard property={property as any} priority={index < 3} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-background-secondary/30 rounded-2xl border border-border/50">
            <h3 className="text-xl font-display text-foreground mb-2">No properties found</h3>
            <p className="text-foreground-secondary mb-6">Try adjusting your filters to find what you're looking for.</p>
            <button
              onClick={() => setFilters({ type: "all", status: "all", city: "all", search: "" })}
              className="px-6 py-2.5 bg-accent-gold/10 text-accent-gold border border-accent-gold/20 font-accent text-sm tracking-wide uppercase rounded-md hover:bg-accent-gold hover:text-background transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Background gradients */}
      <div className="pointer-events-none absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-accent-gold/5 blur-[150px] translate-x-1/2" />
    </section>
  );
}
