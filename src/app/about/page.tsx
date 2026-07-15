import { Metadata } from "next";
import { AboutHero, VisionMission, Founder, Statistics, CTASection } from "@/components/sections";
import { SITE_CONFIG } from "@/data/navigation";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_CONFIG.name}, our vision, our leadership, and our commitment to crafting luxury real estate across India.`,
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <VisionMission />
      <Statistics />
      <Founder />
      <CTASection />
    </div>
  );
}
