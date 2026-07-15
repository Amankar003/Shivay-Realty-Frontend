"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <span className="overline mb-4">Something Went Wrong</span>
      <h1 className="text-gradient-gold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
        Unexpected Error
      </h1>
      <p
        className="mb-8 max-w-md text-lg"
        style={{ color: "var(--foreground-secondary)" }}
      >
        We apologize for the inconvenience. Please try again or return to the homepage.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-accent font-medium tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          style={{
            background: "var(--accent-gold)",
            color: "var(--background)",
            boxShadow: "var(--shadow-gold)",
          }}
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border px-8 py-3.5 text-sm font-accent font-medium tracking-wide uppercase transition-all duration-300 hover:scale-[1.02]"
          style={{
            borderColor: "hsla(42, 78%, 55%, 0.3)",
            color: "var(--accent-gold)",
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
