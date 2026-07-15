import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ScrollReveal, GlassCard } from "@/components/shared";
import { SITE_CONFIG } from "@/data/navigation";

export function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Corporate Headquarters",
      details: [
        "Shivaay Tower, 45th Floor",
        "Bandra Kurla Complex",
        "Mumbai, Maharashtra 400051",
      ],
    },
    {
      icon: Phone,
      title: "Contact Numbers",
      details: [
        `Sales: ${SITE_CONFIG.phone}`,
        "Corporate: +91 22 6789 0123",
        "Toll-Free: 1800 123 4567",
      ],
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        `Sales: ${SITE_CONFIG.email}`,
        "Support: support@shivaayrealty.com",
        "Press: media@shivaayrealty.com",
      ],
    },
    {
      icon: Clock,
      title: "Operating Hours",
      details: [
        "Monday - Friday: 9:00 AM - 7:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed (Available by appointment)",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal direction="up" duration={0.6}>
        <h2 className="font-display text-4xl font-medium text-foreground mb-6">
          Get in Touch
        </h2>
        <p className="text-foreground-secondary text-lg leading-relaxed mb-8">
          Whether you are looking for your next luxury residence or exploring partnership opportunities, our dedicated team is here to assist you with the highest level of service.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {contactDetails.map((item, index) => {
          const Icon = item.icon;
          return (
            <ScrollReveal key={item.title} direction="up" delay={0.1 * (index + 1)}>
              <GlassCard hover className="h-full border-border/50 bg-background/50 p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/10 text-accent-gold border border-accent-gold/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-accent text-sm tracking-wider uppercase text-foreground font-medium mb-4">
                  {item.title}
                </h3>
                <ul className="flex flex-col gap-2 text-foreground-secondary text-sm">
                  {item.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </GlassCard>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
