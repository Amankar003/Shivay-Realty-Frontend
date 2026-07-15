import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "heavy" | "light" | "gold";
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "default",
  hover = false,
}: GlassCardProps) {
  const variants = {
    default: "glass",
    heavy: "glass-heavy",
    light: "glass-light",
    gold: "glass-gold",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-8 transition-all duration-300",
        variants[variant],
        hover && "hover:-translate-y-2 hover:shadow-gold hover:border-accent-gold/30",
        className
      )}
    >
      {children}
    </div>
  );
}
