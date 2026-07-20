"use client";

import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize2, MapPin } from "lucide-react";
import { cn, formatPrice, formatArea, getStatusLabel, getPropertyTypeLabel } from "@/lib/utils";
import type { PropertyCardData } from "@/types";

interface PropertyCardProps {
  property: PropertyCardData;
  className?: string;
  priority?: boolean;
}

export function PropertyCard({ property, className, priority = false }: PropertyCardProps) {
  const statusColors = {
    upcoming: "bg-blue-900/50 text-blue-200 border-blue-500/30",
    "under-construction": "bg-amber-900/50 text-amber-200 border-amber-500/30",
    "ready-to-move": "bg-green-900/50 text-green-200 border-green-500/30",
  };

  return (
    <Link href={`/projects/${property.slug}`} className={cn("group block w-full", className)}>
      <div className="glass flex flex-col h-full overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-gold hover:border-accent-gold/40 active:scale-[0.98]">
        
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={property.images && property.images.length > 0 ? property.images[0].url : (property.image?.url || "/images/photo-1600596542815-ffad4c1539a9.jpg")}
            alt={property.images && property.images.length > 0 ? (property.images[0].alt_text || property.title) : (property.image?.altText || property.title)}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className={cn(
              "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md",
              statusColors[property.status]
            )}>
              {getStatusLabel(property.status)}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center rounded-full bg-background/60 backdrop-blur-md border border-border px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-foreground-secondary">
              {getPropertyTypeLabel(property.propertyType)}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4">
            {property.builderName && (
              <span className="mb-1 block font-accent text-[11px] font-semibold uppercase tracking-wider text-accent-gold">
                {property.builderName}
              </span>
            )}
            <h3 className="mb-2 font-display text-2xl font-medium text-foreground transition-colors group-hover:text-accent-gold">
              {property.title}
            </h3>
            <p className="flex items-center gap-1.5 text-sm text-foreground-secondary">
              <MapPin className="h-4 w-4 text-accent-gold" />
              {property.location}, {property.city}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="mb-6 grid grid-cols-3 gap-4 border-y border-border py-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <BedDouble className="h-5 w-5 text-accent-gold/70" />
              <span className="font-accent text-xs font-medium text-foreground-secondary">{property.bedrooms} Beds</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 border-x border-border">
              <Bath className="h-5 w-5 text-accent-gold/70" />
              <span className="font-accent text-xs font-medium text-foreground-secondary">{property.bathrooms} Baths</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <Maximize2 className="h-5 w-5 text-accent-gold/70" />
              <span className="font-accent text-xs font-medium text-foreground-secondary">{formatArea(property.areaSqft)}</span>
            </div>
          </div>

          {/* Price & Action */}
          <div className="mt-auto flex items-center justify-between">
            <div>
              <span className="block font-accent text-xs tracking-wider text-foreground-muted uppercase">Starting at</span>
              <span className="font-display text-2xl font-medium text-accent-gold">
                ₹{property.price} {property.priceUnit}
              </span>
            </div>
            
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-gold/30 bg-accent-gold/5 text-accent-gold transition-all duration-300 group-hover:bg-accent-gold group-hover:text-background group-hover:shadow-gold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
