import { Metadata } from "next";
import { ContactInfo, ContactForm } from "@/components/sections";
import { SITE_CONFIG } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_CONFIG.name}. Schedule a private viewing, inquire about our luxury properties, or reach out for partnership opportunities.`,
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* Decorative Header */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 overflow-hidden">
        <div className="container-luxury relative z-10 text-center">
          <span className="overline text-accent-gold mb-4 block">Let&apos;s Connect</span>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-foreground leading-tight max-w-3xl mx-auto">
            Experience the <span className="text-gradient-gold italic pr-2">Shivaay</span> Difference
          </h1>
        </div>
        {/* Background gradient */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-gold/5 blur-[150px]" />
      </section>

      {/* Main Content */}
      <section className="relative pb-24 md:pb-32">
        <div className="container-luxury relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-6">
              <ContactInfo />
            </div>
            
            {/* Right Column: Contact Form */}
            <div className="lg:col-span-6">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
