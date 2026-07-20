"use client";

import { useReducedMotion as useFramerReducedMotion, Variants } from "framer-motion";

/**
 * Custom hook to safely check for reduced motion preferences.
 */
export function useReducedMotion() {
  const prefersReduced = useFramerReducedMotion();
  return prefersReduced;
}

/**
 * Standard staggered container variant.
 * Use this on a parent motion.div to orchestrate children.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Premium fade in up animation with a specialized ease curve.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Gold line reveal from left to right.
 */
export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};
