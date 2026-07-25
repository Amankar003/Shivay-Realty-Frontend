// Property-related type definitions

export type PropertyStatus = "upcoming" | "under-construction" | "ready-to-move";

export type PropertyType = "apartment" | "villa" | "penthouse" | "commercial" | "plot" | "townhouse";

export type PriceUnit = "Cr" | "L" | "K";

export interface PropertyImage {
  id: string;
  url: string;
  publicId: string;
  altText: string;
  order: number;
  createdAt: string;
}

export interface NearbyPlace {
  name: string;
  type: "school" | "hospital" | "mall" | "transport" | "park" | "restaurant" | "airport";
  distance: string;
}

export interface FloorPlan {
  name: string;
  imageUrl: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
}

export interface PropertyHighlight {
  title: string;
  description: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  builderName?: string | null;
  description: string;
  price: number;
  priceUnit: PriceUnit;
  location: string;
  city: string;
  state: string;
  address: string;
  latitude: number;
  longitude: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  amenities: string[];
  highlights: PropertyHighlight[];
  floorPlans: FloorPlan[];
  nearbyPlaces: NearbyPlace[];
  images: PropertyImage[];
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyCardData {
  id: string;
  title: string;
  slug: string;
  builderName?: string | null;
  price: number;
  priceUnit: PriceUnit;
  location: string;
  city: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  isFeatured: boolean;
  image: PropertyImage | null;
}

export interface PropertyFilters {
  search?: string;
  city?: string;
  propertyType?: PropertyType;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  sortBy?: "price-asc" | "price-desc" | "newest" | "name-asc";
  page?: number;
  limit?: number;
}
