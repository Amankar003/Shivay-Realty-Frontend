import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { SITE_CONFIG, FOOTER_LINKS } from "@/data/navigation";
import { ScrollReveal } from "@/components/shared";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    instagram: FaInstagram,
    facebook: FaFacebookF,
    linkedin: FaLinkedinIn,
    twitter: FaTwitter,
    youtube: FaYoutube,
  };

  return (
    <footer className="relative mt-auto overflow-hidden bg-background pt-20 pb-10">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
      
      {/* Subtle glow background */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] max-w-[1000px] opacity-[0.03]" style={{ background: "radial-gradient(ellipse at bottom, var(--accent-gold) 0%, transparent 70%)" }} />

      <div className="container-luxury relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Brand Column */}
          <ScrollReveal direction="up" duration={0.6}>
            <div className="flex flex-col gap-6">
              <Link href="/" className="inline-block">
                <span className="font-display text-3xl font-semibold tracking-wide text-foreground">
                  Shivaay
                </span>
                <span className="block font-accent text-xs tracking-[0.3em] text-accent-gold mt-1">
                  REALTY
                </span>
              </Link>
              <p className="text-foreground-secondary text-sm leading-relaxed max-w-xs">
                {SITE_CONFIG.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                {Object.entries(SITE_CONFIG.socialLinks).map(([platform, url]) => {
                  const Icon = socialIcons[platform as keyof typeof socialIcons];
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-secondary text-foreground-muted transition-all duration-300 hover:border-accent-gold/50 hover:bg-accent-gold/10 hover:text-accent-gold hover:shadow-gold"
                      aria-label={`Follow us on ${platform}`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links Column */}
          <ScrollReveal direction="up" delay={0.1} duration={0.6}>
            <div>
              <h4 className="font-accent text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                Company
              </h4>
              <ul className="flex flex-col gap-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-foreground-secondary text-sm transition-colors hover:text-accent-gold inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 transition-all group-hover:opacity-100 group-hover:ml-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Legal Column */}
          <ScrollReveal direction="up" delay={0.2} duration={0.6}>
            <div>
              <h4 className="font-accent text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                Legal & Support
              </h4>
              <ul className="flex flex-col gap-3">
                {[...FOOTER_LINKS.legal, ...FOOTER_LINKS.support].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-foreground-secondary text-sm transition-colors hover:text-accent-gold inline-flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-5 transition-all group-hover:opacity-100 group-hover:ml-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Contact Column */}
          <ScrollReveal direction="up" delay={0.3} duration={0.6}>
            <div>
              <h4 className="font-accent text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
                Contact Us
              </h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 text-sm text-foreground-secondary">
                  <MapPin className="h-5 w-5 text-accent-gold shrink-0 mt-0.5" />
                  <span>
                    {SITE_CONFIG.address.line1}<br />
                    {SITE_CONFIG.address.line2}<br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.pincode}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground-secondary">
                  <Phone className="h-5 w-5 text-accent-gold shrink-0" />
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-accent-gold transition-colors">
                    {SITE_CONFIG.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground-secondary">
                  <Mail className="h-5 w-5 text-accent-gold shrink-0" />
                  <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-accent-gold transition-colors">
                    {SITE_CONFIG.email}
                  </a>
                </li>
              </ul>
            </div>
          </ScrollReveal>

        </div>

        {/* Bottom Bar */}
        <ScrollReveal direction="up" delay={0.4} duration={0.6}>
          <div className="mt-16 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground-muted">
            <p>© {currentYear} {SITE_CONFIG.name}. All rights reserved.</p>
            <p>Designed for Luxury.</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
