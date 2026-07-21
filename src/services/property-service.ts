// Property API service layer

import { api } from "@/lib/api";
import type {
  Property,
  PropertyCardData,
  PropertyFilters,
  PaginatedResponse,
} from "@/types";

// Helper to map backend property to frontend type
function mapPropertyResponse(item: any): Property {
  return {
    ...item,
    builderName: item.builder_name,
    priceUnit: item.price_unit,
    propertyType: item.property_type,
    areaSqft: item.area_sqft,
    floorPlans: item.floor_plans,
    nearbyPlaces: item.nearby_places,
    isFeatured: item.is_featured,
    isPublished: item.is_published,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}

export const propertyService = {
  /**
   * Get paginated list of properties with filters
   */
  async getProperties(filters?: PropertyFilters): Promise<PaginatedResponse<PropertyCardData>> {
    const response = await api.get<any>("/properties", {
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
    
    // Map items if response is paginated (it's a dict with items)
    if (response && Array.isArray(response.items)) {
      response.items = response.items.map(mapPropertyResponse);
      return response as PaginatedResponse<PropertyCardData>;
    }

    if (Array.isArray(response)) {
      return {
        items: response.map(mapPropertyResponse) as unknown as PropertyCardData[],
        total: response.length,
        page: 1,
        limit: response.length,
        totalPages: 1,
      };
    }
    
    return response as PaginatedResponse<PropertyCardData>;
  },

  /**
   * Get a single property by slug
   */
  async getPropertyBySlug(slug: string) {
    const data = await api.get<any>(`/properties/${slug}`);
    return data ? mapPropertyResponse(data) : null;
  },

  /**
   * Get featured properties for homepage
   */
  async getFeaturedProperties() {
    const data = await api.get<any[]>("/properties/featured");
    return data.map(mapPropertyResponse) as unknown as PropertyCardData[];
  },
};
