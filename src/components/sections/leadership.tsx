import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { SectionHeader, ScrollReveal, GlassCard } from "@/components/shared";

export function Leadership() {
  const leaders = [
    {
      name: "Rohan Singhania",
      role: "Founder & Chairman",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "With over two decades of experience in ultra-luxury real estate, Rohan established Shivaay Realty to redefine the Indian luxury housing market.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Aisha Kapoor",
      role: "Chief Design Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "An award-winning architect, Aisha brings a unique blend of modern minimalism and classic Indian aesthetics to every Shivaay project.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Vikram Malhotra",
      role: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Vikram ensures our promise of on-time delivery and uncompromising quality is met flawlessly across all development sites.",
      linkedin: "https://linkedin.com",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container-luxury relative z-10">
        <SectionHeader
          overline="The Minds Behind The Magic"
          title="Our Leadership"
          subtitle="Guided by industry veterans with an uncompromising dedication to perfection."
          alignment="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {leaders.map((leader, index) => (
            <ScrollReveal
              key={leader.name}
              direction="up"
              delay={0.1 * (index + 1)}
              duration={0.6}
            >
              <GlassCard hover className="h-full border-border/40 flex flex-col p-0 overflow-hidden group">
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
                  
                  {/* Content over image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="font-display text-2xl font-medium text-foreground">
                      {leader.name}
                    </h3>
                    <p className="text-accent-gold font-accent tracking-wider text-xs uppercase mb-4">
                      {leader.role}
                    </p>
                    <p className="text-foreground-secondary text-sm leading-relaxed mb-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {leader.bio}
                    </p>
                    <div className="flex">
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-md text-foreground transition-all duration-300 hover:border-accent-gold hover:bg-accent-gold/20 hover:text-accent-gold opacity-0 group-hover:opacity-100"
                        aria-label={`${leader.name} LinkedIn`}
                      >
                        <FaLinkedinIn className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
      
      {/* Background gradients */}
      <div className="pointer-events-none absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-[120px] -translate-x-1/2" />
    </section>
  );
}
