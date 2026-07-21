"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PremiumLoaderProps {
  /** If true, loader is shown. Defaults to true and auto-hides after animation. */
  isLoading?: boolean;
}

export function PremiumLoader({ isLoading: externalLoading }: PremiumLoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (externalLoading === false) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, [externalLoading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, hsl(220, 20%, 8%) 0%, hsl(220, 20%, 4%) 100%)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full opacity-20 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, hsl(42, 78%, 55%) 0%, transparent 70%)",
            }}
          />

          {/* Logo text reveal */}
          <div className="relative flex flex-col items-center gap-6">
            {/* SHIVAAY REALTY */}
            <motion.h1
              className="font-display text-3xl md:text-5xl font-semibold tracking-[0.15em] uppercase"
              style={{ color: "hsl(42, 78%, 55%)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            >
              <span className="loader-shimmer-text">SHIVAAY REALTY</span>
            </motion.h1>

            {/* Golden line */}
            <motion.div
              className="h-[2px] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, hsl(42, 78%, 55%) 30%, hsl(38, 85%, 65%) 50%, hsl(42, 78%, 55%) 70%, transparent 100%)",
              }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.5,
              }}
            />

            {/* Tagline */}
            <motion.p
              className="font-accent text-sm md:text-base tracking-[0.25em] uppercase"
              style={{ color: "hsl(220, 10%, 55%)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Your Trusted Real Estate Partner
            </motion.p>

            {/* Loading dots */}
            <div className="flex items-center gap-1.5 mt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "hsl(42, 78%, 55%)" }}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          <style jsx>{`
            .loader-shimmer-text {
              position: relative;
              display: inline-block;
              background: linear-gradient(
                110deg,
                hsl(42, 78%, 55%) 0%,
                hsl(42, 78%, 55%) 40%,
                hsl(42, 78%, 80%) 50%,
                hsl(42, 78%, 55%) 60%,
                hsl(42, 78%, 55%) 100%
              );
              background-size: 200% 100%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: loader-shimmer 2.5s ease-in-out infinite;
            }
            @keyframes loader-shimmer {
              0% {
                background-position: 100% 0;
              }
              100% {
                background-position: -100% 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
