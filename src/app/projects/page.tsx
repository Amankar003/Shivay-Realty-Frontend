import { Metadata } from "next";
import { ProjectsList, CTASection } from "@/components/sections";
import { SITE_CONFIG } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Luxury Projects",
  description: `Explore ${SITE_CONFIG.name}'s portfolio of luxury residential and commercial developments across India. Filter by city, status, and property type to find your perfect home.`,
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <ProjectsList />
      <CTASection />
    </div>
  );
}
