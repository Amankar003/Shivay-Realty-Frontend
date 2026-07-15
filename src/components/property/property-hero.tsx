"use client";

import Image from "next/image";
import { MapPin, BedDouble, Bath, Maximize2 } from "lucide-react";
import { Property } from "@/types";
import { formatPrice, formatArea, getStatusLabel, getPropertyTypeLabel } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared";
import { useState } from "react";

interface PropertyHeroProps {
  property: Property;
}

export function PropertyHero({ property }: PropertyHeroProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-background">
      <div className="container-luxury relative z-10">
        
        {/* Header Info */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ScrollReveal direction="up" duration={0.6}>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-full border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-accent-gold">
                {getStatusLabel(property.status)}
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-background-secondary px-3 py-1 text-xs font-semibold tracking-wider uppercase text-foreground-secondary">
                {getPropertyTypeLabel(property.propertyType)}
              </span>
            </div>
            {property.builderName && (
              <span className="mb-2 block font-accent text-sm font-semibold uppercase tracking-widest text-accent-gold">
                {property.builderName}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-3">
              {property.title}
            </h1>
            <p className="flex items-center gap-2 text-lg text-foreground-secondary">
              <MapPin className="h-5 w-5 text-accent-gold" />
              {property.address}
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2} duration={0.6} className="md:text-right">
            <span className="block font-accent text-sm tracking-wider text-foreground-muted uppercase mb-1">
              Starting Price
            </span>
            <div className="font-display text-4xl md:text-5xl font-medium text-accent-gold">
              ₹{property.price} {property.priceUnit}
            </div>
          </ScrollReveal>
        </div>

        {/* Gallery */}
        <ScrollReveal direction="up" delay={0.3} duration={0.8}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[50vh] lg:h-[70vh] mb-12">
            
            {/* Main Image */}
            <div className="lg:col-span-8 relative h-full rounded-2xl overflow-hidden group">
              {property.images.length > 0 ? (
                <Image
                  src={property.images[activeImage].url}
                  alt={property.images[activeImage].altText}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              ) : (
                <div className="w-full h-full bg-background-secondary flex items-center justify-center">
                  <span className="text-foreground-muted font-accent">No Image Available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Thumbnails */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-4 h-full">
              {property.images.slice(0, 3).map((img, idx) => (
                <div 
                  key={img.id}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-1 rounded-2xl overflow-hidden cursor-pointer group ${activeImage === idx ? 'ring-2 ring-accent-gold ring-offset-2 ring-offset-background' : 'opacity-70 hover:opacity-100 transition-opacity'}`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="33vw"
                  />
                  {idx === 2 && property.images.length > 3 && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white font-display text-xl">+{property.images.length - 3}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Stats */}
        <ScrollReveal direction="up" delay={0.4} duration={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8 rounded-2xl border border-border/50 bg-background-secondary/30 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-gold">
                <BedDouble className="h-5 w-5" />
                <span className="font-accent text-sm tracking-widest uppercase">Bedrooms</span>
              </div>
              <span className="font-display text-2xl md:text-3xl text-foreground">{property.bedrooms} Beds</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-gold">
                <Bath className="h-5 w-5" />
                <span className="font-accent text-sm tracking-widest uppercase">Bathrooms</span>
              </div>
              <span className="font-display text-2xl md:text-3xl text-foreground">{property.bathrooms} Baths</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-gold">
                <Maximize2 className="h-5 w-5" />
                <span className="font-accent text-sm tracking-widest uppercase">Area</span>
              </div>
              <span className="font-display text-2xl md:text-3xl text-foreground">{formatArea(property.areaSqft)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-gold">
                <MapPin className="h-5 w-5" />
                <span className="font-accent text-sm tracking-widest uppercase">Location</span>
              </div>
              <span className="font-display text-xl md:text-2xl text-foreground leading-tight">{property.city}</span>
            </div>
          </div>
        </ScrollReveal>
        
      </div>
    </section>
  );
}
