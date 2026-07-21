"use client";

interface SkeletonCardProps {
  count?: number;
}

export function SkeletonCard({ count = 1 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton-card relative overflow-hidden rounded-2xl"
          style={{
            background: "var(--background-secondary)",
            border: "1px solid hsla(220, 20%, 4%, 0.06)",
          }}
        >
          {/* Image skeleton */}
          <div
            className="skeleton-shimmer h-52 w-full"
            style={{ background: "var(--background-tertiary)" }}
          />

          {/* Content skeleton */}
          <div className="flex flex-col gap-3 p-5">
            {/* Title */}
            <div
              className="skeleton-shimmer h-5 w-3/4 rounded-md"
              style={{ background: "var(--background-tertiary)" }}
            />

            {/* Price */}
            <div
              className="skeleton-shimmer h-4 w-1/3 rounded-md"
              style={{ background: "var(--background-tertiary)" }}
            />

            {/* Location */}
            <div
              className="skeleton-shimmer h-4 w-1/2 rounded-md"
              style={{ background: "var(--background-tertiary)" }}
            />

            {/* Badges row */}
            <div className="flex gap-2 mt-2">
              <div
                className="skeleton-shimmer h-6 w-16 rounded-full"
                style={{ background: "var(--background-tertiary)" }}
              />
              <div
                className="skeleton-shimmer h-6 w-16 rounded-full"
                style={{ background: "var(--background-tertiary)" }}
              />
              <div
                className="skeleton-shimmer h-6 w-20 rounded-full"
                style={{ background: "var(--background-tertiary)" }}
              />
            </div>
          </div>

          <style jsx>{`
            .skeleton-shimmer {
              position: relative;
              overflow: hidden;
            }
            .skeleton-shimmer::after {
              content: "";
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                90deg,
                transparent 0%,
                hsla(42, 78%, 55%, 0.06) 40%,
                hsla(42, 78%, 55%, 0.1) 50%,
                hsla(42, 78%, 55%, 0.06) 60%,
                transparent 100%
              );
              animation: skeleton-sweep 2s ease-in-out infinite;
            }
            @keyframes skeleton-sweep {
              0% {
                left: -100%;
              }
              100% {
                left: 100%;
              }
            }
          `}</style>
        </div>
      ))}
    </>
  );
}
