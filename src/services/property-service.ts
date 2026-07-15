// Property API service layer

import { api } from "@/lib/api";
import type {
  Property,
  PropertyCardData,
  PropertyFilters,
  PaginatedResponse,
} from "@/types";

export const propertyService = {
  /**
   * Get paginated list of properties with filters
   */
  async getProperties(filters?: PropertyFilters) {
    return api.get<PaginatedResponse<PropertyCardData>>("/properties", {
      search: filters?.search,
      city: filters?.city,
      property_type: filters?.propertyType,
      status: filters?.status,
      min_price: filters?.minPrice,
      max_price: filters?.maxPrice,
      bedrooms: filters?.bedrooms,
      sort_by: filters?.sortBy,
      page: filters?.page,
      limit: filters?.limit,
    });
  },

  /**
   * Get a single property by slug
   */
  async getPropertyBySlug(slug: string) {
    return api.get<Property>(`/properties/${slug}`);
  },

  /**
   * Get featured properties for homepage
   */
  async getFeaturedProperties() {
    return api.get<PropertyCardData[]>("/properties/featured");
  },
};
