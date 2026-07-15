// Custom hook for scroll-based animations and navbar state

"use client";

import { useEffect, useCallback } from "react";
import { useUIStore } from "@/store/ui-store";

interface UseScrollAnimationOptions {
  threshold?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 50 } = options;
  const setScrolled = useUIStore((state) => state.setScrolled);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > threshold);
  }, [threshold, setScrolled]);

  useEffect(() => {
    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
}
