"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PropertyForm } from "@/components/admin/property-form";
import { apiClient } from "@/services/api-client";
import { Property } from "@/types";

export default function EditPropertyPage() {
  const params = useParams();
  const id = params.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd fetch property by ID. Since our mock returns all, we find it.
    apiClient.getProperties().then(data => {
      const prop = data.find(p => p.id === id);
      if (prop) {
        setProperty(prop);
      }
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  return <PropertyForm initialData={property} />;
}
