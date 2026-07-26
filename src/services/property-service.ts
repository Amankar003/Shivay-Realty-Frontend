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
    isTrending: item.is_trending,
    isPublished: item.is_published,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    images: item.images || [],
    image: item.images && item.images.length > 0 ? {
      ...item.images[0],
      altText: item.images[0].alt_text,
      publicId: item.images[0].public_id
    } : null,
  };
}

export interface SearchSuggestion {
  label: string;
  type: string;
}

export const propertyService = {
  /**
   * Get paginated list of properties with server-side filters
   */
  async getProperties(
    filters?: PropertyFilters
  ): Promise<PaginatedResponse<PropertyCardData>> {
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

    const rawItems = response?.items || response?.data?.items || (Array.isArray(response) ? response : []);
    const mappedItems = Array.isArray(rawItems) ? rawItems.map(mapPropertyResponse) : [];

    console.log("[RUNTIME INSTRUMENTATION] Raw Response =", response);
    console.log("[RUNTIME INSTRUMENTATION] Mapped Items count =", mappedItems.length);

    return {
      items: mappedItems as unknown as PropertyCardData[],
      total: response?.total || mappedItems.length,
      page: response?.page || 1,
      limit: response?.limit || filters?.limit || 12,
      totalPages: response?.totalPages || 1,
    };
  },

  /**
   * Get structured search suggestions for autocomplete
   */
  async getSuggestions(query: string): Promise<SearchSuggestion[]> {
    if (!query || query.trim().length < 1) return [];
    try {
      return await api.get<SearchSuggestion[]>("/properties/suggestions", {
        q: query.trim(),
      });
    } catch {
      return [];
    }
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
    const response = await api.get<any>("/properties/featured");
    const rawItems = response?.items || response?.data?.items || (Array.isArray(response) ? response : []);
    return (Array.isArray(rawItems) ? rawItems.map(mapPropertyResponse) : []) as unknown as PropertyCardData[];
  },
};
