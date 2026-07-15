import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPropertyBySlug } from "@/data/properties";
import { PropertyHero, PropertyAmenities, InquiryForm } from "@/components/property";
import { SITE_CONFIG } from "@/data/navigation";

// Generate dynamic metadata for SEO
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: `${property.title} | Luxury ${property.propertyType} in ${property.city}`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: `${property.title} by ${SITE_CONFIG.name}`,
      description: property.description.substring(0, 160),
      images: property.images.length > 0 ? [{ url: property.images[0].url }] : [],
    },
  };
}

export default async function PropertyDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const property = getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PropertyHero property={property} />
      
      <section className="py-20 bg-background relative border-t border-border/50">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Amenities & Details */}
            <div className="lg:col-span-8">
              <PropertyAmenities property={property} />
            </div>
            
            {/* Right Column: Sticky Inquiry Form */}
            <div className="lg:col-span-4 relative">
              <InquiryForm propertyName={property.title} />
            </div>

          </div>
        </div>
        
        {/* Background gradient */}
        <div className="pointer-events-none absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-[120px] -translate-x-1/2 translate-y-1/2" />
      </section>
    </div>
  );
}
