"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Hero, FeaturedProjects, CTASection } from "@/components/sections";
import { SkeletonCard } from "@/components/shared";

// Lazy load heavy below-the-fold sections for performance
const WhyChooseUs = dynamic(
  () =>
    import("@/components/sections/why-choose-us").then((m) => ({
      default: m.WhyChooseUs,
    })),
  { ssr: false }
);

const HowWeWork = dynamic(
  () =>
    import("@/components/sections/how-we-work").then((m) => ({
      default: m.HowWeWork,
    })),
  { ssr: false }
);

const Statistics = dynamic(
  () =>
    import("@/components/sections/statistics").then((m) => ({
      default: m.Statistics,
    })),
  { ssr: false }
);

const Testimonials = dynamic(
  () =>
    import("@/components/sections/testimonials").then((m) => ({
      default: m.Testimonials,
    })),
  { ssr: false }
);

function SectionFallback() {
  return (
    <div className="container-luxury py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard count={3} />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProjects />
      <Suspense fallback={<SectionFallback />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <HowWeWork />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Statistics />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <CTASection />
    </div>
  );
}
