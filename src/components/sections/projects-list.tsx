"use client";

import { useState, useEffect, useCallback } from "react";
import { PropertyCard, PropertyFilters } from "@/components/property";
import { SectionHeader, ScrollReveal } from "@/components/shared";
import { propertyService } from "@/services/property-service";
import type { PropertyType, PropertyStatus, PropertyCardData } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectsList() {
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const [filters, setFilters] = useState({
    type: "all" as PropertyType | "all",
    status: "all" as PropertyStatus | "all",
    city: "all",
    search: "",
    sortBy: "newest",
  });

  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Fetch cities once (for dropdown)
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await propertyService.getProperties({ limit: 100 });
        const uniqueCities = new Set(data.items.map(p => p.city));
        setAvailableCities(Array.from(uniqueCities).sort());
      } catch (error) {
        console.error("Failed to load cities", error);
      }
    };
    fetchCities();
  }, []);

  const fetchProperties = useCallback(async (currentFilters: typeof filters, currentPage: number) => {
    setIsLoading(true);
    try {
      const data = await propertyService.getProperties({
        search: currentFilters.search,
        city: currentFilters.city === "all" ? undefined : currentFilters.city,
        propertyType: currentFilters.type === "all" ? undefined : (currentFilters.type as any),
        status: currentFilters.status === "all" ? undefined : (currentFilters.status as any),
        sortBy: currentFilters.sortBy as "newest" | "price-asc" | "price-desc" | "name-asc" | undefined,
        page: currentPage,
        limit,
      });
      setProperties(data.items);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to refetch when filters or page change
  useEffect(() => {
    fetchProperties(filters, page);
  }, [filters, page, fetchProperties]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page on filter change
  };

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

        <PropertyFilters onFilterChange={handleFilterChange} cities={availableCities} isLoading={isLoading} />

        {/* Results Count */}
        <div className="mb-6 font-accent text-sm text-foreground-secondary flex justify-between items-center">
          <span>
            {isLoading ? (
              "Loading..."
            ) : (
              <>Showing {properties.length > 0 ? (page - 1) * limit + 1 : 0}-{Math.min(page * limit, total)} of {total} {total === 1 ? 'property' : 'properties'}</>
            )}
          </span>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-background-secondary rounded-3xl h-[450px] border border-border/50 overflow-hidden">
                <div className="h-2/3 bg-background-secondary/80" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-background-secondary/80 rounded-md w-3/4" />
                  <div className="h-4 bg-background-secondary/80 rounded-md w-1/2" />
                  <div className="h-8 bg-background-secondary/80 rounded-md w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
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
              onClick={() => handleFilterChange({ type: "all", status: "all", city: "all", search: "", sortBy: "newest" })}
              className="px-6 py-2.5 bg-accent-gold/10 text-accent-gold border border-accent-gold/20 font-accent text-sm tracking-wide uppercase rounded-md hover:bg-accent-gold hover:text-background transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-full border border-border bg-background hover:bg-background-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            
            <div className="flex gap-1 mx-4">
              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1;
                const isCurrent = p === page;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      isCurrent 
                        ? "bg-accent-gold text-background" 
                        : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-full border border-border bg-background hover:bg-background-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        )}
      </div>
      
      {/* Background gradients */}
      <div className="pointer-events-none absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-accent-gold/5 blur-[150px] translate-x-1/2" />
    </section>
  );
}
