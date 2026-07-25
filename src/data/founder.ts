export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  photo_url: string | null;
  linkedin: string | null;
  instagram: string | null;
  is_founder: boolean;
  is_active: boolean;
  display_order: number;
}

export const founderData: TeamMember = {
  id: "founder-1",
  name: "Rahul Ball",
  designation: "Founder & CEO",
  bio: "With over two decades of experience in the luxury real estate market, Rahul founded Shivaay Realty with a singular vision: to bring complete transparency and personalized advisory to the property buying process.",
  photo_url: "/images/founder.avif",
  linkedin: "https://linkedin.com/in/Rahul",
  instagram: "https://instagram.com/Rahul",
  is_founder: true,
  is_active: true,
  display_order: 0
};
