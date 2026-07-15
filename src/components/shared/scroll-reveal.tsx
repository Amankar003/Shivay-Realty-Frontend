"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  triggerOnce?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  triggerOnce = true,
}: ScrollRevealProps) {
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initial = {
    opacity: 0,
    ...directionOffset[direction],
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: triggerOnce, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom smooth ease-out
      }}
      className={cn("will-change-[opacity,transform]", className)}
    >
      {children}
    </motion.div>
  );
}
