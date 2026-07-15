import { CheckCircle2, Sparkles } from "lucide-react";
import { Property } from "@/types";
import { ScrollReveal, GlassCard } from "@/components/shared";

interface PropertyAmenitiesProps {
  property: Property;
}

export function PropertyAmenities({ property }: PropertyAmenitiesProps) {
  return (
    <div className="flex flex-col gap-12">
      
      {/* Description */}
      <ScrollReveal direction="up" duration={0.6}>
        <h2 className="font-display text-3xl font-medium text-foreground mb-6">
          About {property.title}
        </h2>
        <p className="text-foreground-secondary leading-relaxed text-lg">
          {property.description}
        </p>
      </ScrollReveal>

      {/* Highlights */}
      {property.highlights && property.highlights.length > 0 && (
        <ScrollReveal direction="up" delay={0.1} duration={0.6}>
          <h2 className="font-display text-3xl font-medium text-foreground mb-6">
            Project Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {property.highlights.map((highlight, index) => (
              <GlassCard key={index} className="p-4 border-border/50 flex items-start gap-3 bg-background/50">
                <Sparkles className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
                <span className="text-foreground-secondary">{highlight}</span>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <ScrollReveal direction="up" delay={0.2} duration={0.6}>
          <h2 className="font-display text-3xl font-medium text-foreground mb-6">
            World-Class Amenities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent-gold/70 shrink-0" />
                <span className="text-foreground-secondary text-sm md:text-base">{amenity}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Nearby Places */}
      {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
        <ScrollReveal direction="up" delay={0.3} duration={0.6}>
          <h2 className="font-display text-3xl font-medium text-foreground mb-6">
            Location Advantages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {property.nearbyPlaces.map((place, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b border-border/50">
                <span className="text-foreground-secondary font-medium">{place.name}</span>
                <span className="text-accent-gold font-accent text-xs tracking-wider uppercase bg-accent-gold/10 px-2 py-1 rounded">{place.distance}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
      
    </div>
  );
}
