import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  overline?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  overline,
  alignment = "center",
  className,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={cn("mb-12 md:mb-16 max-w-3xl", alignmentClasses[alignment], className)}>
      <ScrollReveal direction="up" duration={0.5}>
        {overline && (
          <span className="overline mb-4 block tracking-[0.2em] text-accent-gold">
            {overline}
          </span>
        )}
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} duration={0.6}>
        <h2 className="text-gradient-gold mb-6 font-display text-4xl font-medium leading-tight md:text-5xl">
          {title}
        </h2>
      </ScrollReveal>

      {subtitle && (
        <ScrollReveal direction="up" delay={0.2} duration={0.6}>
          <p className="text-lg text-foreground-secondary md:text-xl">
            {subtitle}
          </p>
        </ScrollReveal>
      )}

      {alignment === "center" && (
        <ScrollReveal direction="up" delay={0.3} duration={0.6}>
          <div className="mt-8 flex justify-center">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent" />
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
