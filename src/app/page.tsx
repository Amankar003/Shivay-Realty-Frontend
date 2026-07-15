import { Hero, FeaturedProjects, WhyChooseUs, HowWeWork, Statistics, Testimonials, CTASection } from "@/components/sections";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProjects />
      <WhyChooseUs />
      <HowWeWork />
      <Statistics />
      <Testimonials />
      <CTASection />
    </div>
  );
}
