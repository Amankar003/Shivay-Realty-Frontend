"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, MoreVertical } from "lucide-react";
import { apiClient } from "@/services/api-client";
import { Property } from "@/types";
import { formatPrice, getStatusLabel, getPropertyTypeLabel } from "@/lib/utils";
import { GlassCard } from "@/components/shared";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await apiClient.getProperties();
      setProperties(data);
    } catch (error) {
      console.error("Failed to load properties", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
      try {
        await apiClient.deleteProperty(id);
        setProperties(properties.filter(p => p.id !== id));
      } catch (error) {
        console.error("Failed to delete property", error);
      }
    }
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Properties</h1>
          <p className="text-foreground-secondary mt-1">Manage your luxury real estate portfolio.</p>
        </div>
        <Link 
          href="/admin/properties/new" 
          className="inline-flex items-center justify-center gap-2 bg-accent-gold text-background px-6 py-2.5 rounded-lg font-accent text-sm font-medium tracking-wide uppercase hover:shadow-gold transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </div>

      <GlassCard className="border-border/50 bg-background/60 flex-1 flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full min-h-[300px]">
              <div className="w-8 h-8 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-xs font-accent tracking-wider uppercase text-foreground-muted bg-background-secondary/30">
                  <th className="p-4 font-medium">Property</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-foreground-secondary">
                      No properties found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-background-secondary/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-background-secondary flex-shrink-0 overflow-hidden relative">
                            {/* Assuming image is handled via mock data; property.image in PropertyCardData vs property.images in full Property */}
                            <img 
                              src={(property as any).image?.url || (property.images?.[0]?.url) || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{property.title}</p>
                            <p className="text-xs text-foreground-secondary">{getPropertyTypeLabel(property.propertyType)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-foreground">{property.location}</p>
                        <p className="text-xs text-foreground-secondary">{property.city}</p>
                      </td>
                      <td className="p-4 text-sm font-medium">
                        ₹{property.price} {property.priceUnit}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center rounded-full bg-accent-gold/10 px-2.5 py-0.5 text-xs font-medium text-accent-gold border border-accent-gold/20 whitespace-nowrap">
                          {getStatusLabel(property.status)}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/admin/properties/${property.id}/edit`}
                            className="p-2 text-foreground-secondary hover:text-accent-gold transition-colors rounded-lg hover:bg-background-secondary"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(property.id)}
                            className="p-2 text-foreground-secondary hover:text-red-500 transition-colors rounded-lg hover:bg-background-secondary"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
