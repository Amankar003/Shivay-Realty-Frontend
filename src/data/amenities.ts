// Static amenities data for property and homepage sections

export interface Amenity {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  category: "indoor" | "outdoor" | "community" | "security";
}

export const amenities: Amenity[] = [
  // Indoor
  { id: "a1", name: "Italian Marble Flooring", icon: "Gem", category: "indoor" },
  { id: "a2", name: "Smart Home Automation", icon: "Smartphone", category: "indoor" },
  { id: "a3", name: "Modular Kitchen", icon: "ChefHat", category: "indoor" },
  { id: "a4", name: "VRV Air Conditioning", icon: "Wind", category: "indoor" },
  { id: "a5", name: "Private Elevator Lobby", icon: "ArrowUpDown", category: "indoor" },

  // Outdoor
  { id: "a6", name: "Infinity Swimming Pool", icon: "Waves", category: "outdoor" },
  { id: "a7", name: "Landscaped Gardens", icon: "TreePine", category: "outdoor" },
  { id: "a8", name: "Jogging Track", icon: "Footprints", category: "outdoor" },
  { id: "a9", name: "Outdoor Amphitheatre", icon: "Music", category: "outdoor" },
  { id: "a10", name: "Children's Play Area", icon: "Baby", category: "outdoor" },

  // Community
  { id: "a11", name: "Luxury Clubhouse", icon: "Building2", category: "community" },
  { id: "a12", name: "Gymnasium & Spa", icon: "Dumbbell", category: "community" },
  { id: "a13", name: "Private Cinema", icon: "Film", category: "community" },
  { id: "a14", name: "Business Lounge", icon: "Briefcase", category: "community" },
  { id: "a15", name: "Banquet Hall", icon: "UtensilsCrossed", category: "community" },

  // Security
  { id: "a16", name: "24/7 CCTV Surveillance", icon: "Eye", category: "security" },
  { id: "a17", name: "Biometric Access", icon: "Fingerprint", category: "security" },
  { id: "a18", name: "Multi-tier Car Parking", icon: "Car", category: "security" },
  { id: "a19", name: "Fire Safety Systems", icon: "Shield", category: "security" },
  { id: "a20", name: "Power Backup", icon: "Zap", category: "security" },
];

export const featuredAmenities = amenities.slice(0, 8);
