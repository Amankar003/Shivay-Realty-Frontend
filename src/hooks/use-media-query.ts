// Custom hook for responsive media queries

"use client";

import { useEffect, useState } from "react";

const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
  "reduced-motion": "(prefers-reduced-motion: reduce)",
  "hover": "(hover: hover)",
} as const;

type BreakpointKey = keyof typeof breakpoints;

export function useMediaQuery(query: BreakpointKey | string): boolean {
  const mediaQuery = query in breakpoints
    ? breakpoints[query as BreakpointKey]
    : query;

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(mediaQuery);
    setMatches(mql.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [mediaQuery]);

  return matches;
}
