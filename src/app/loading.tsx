// Global loading component
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
            style={{
              borderTopColor: "var(--accent-gold)",
              borderRightColor: "var(--accent-gold)",
            }}
          />
        </div>
        <p
          className="text-sm font-accent tracking-wider uppercase"
          style={{ color: "var(--foreground-muted)" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
