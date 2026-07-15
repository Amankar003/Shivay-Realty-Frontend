import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <span className="overline mb-4">Page Not Found</span>
      <h1 className="text-gradient-gold mb-4" style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
        404
      </h1>
      <p
        className="mb-8 max-w-md text-lg"
        style={{ color: "var(--foreground-secondary)" }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved to a new address.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-accent font-medium tracking-wide uppercase transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: "var(--accent-gold)",
          color: "var(--background)",
          boxShadow: "var(--shadow-gold)",
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
