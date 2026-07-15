"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/shared";
import { Property } from "@/types";

const propertySchema = z.object({
  title: z.string().min(5, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  builderName: z.string().nullable().optional(),
  description: z.string().min(10, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  priceUnit: z.string().min(1, "Price unit is required"),
  location: z.string().min(1, "Location is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number(),
  longitude: z.number(),
  propertyType: z.string().min(1, "Property type is required"),
  status: z.string().min(1, "Status is required"),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  areaSqft: z.number().min(0),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  amenities: z.array(z.object({ value: z.string() })).min(1),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  initialData?: Property;
}

export function PropertyForm({ initialData }: PropertyFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: Partial<PropertyFormValues> = initialData ? {
    ...initialData,
    amenities: initialData.amenities?.map(a => ({ value: a })) || [{ value: "" }],
  } : {
    title: "",
    slug: "",
    builderName: "",
    description: "",
    price: 0,
    priceUnit: "Cr",
    location: "",
    city: "",
    state: "",
    address: "",
    latitude: 0,
    longitude: 0,
    propertyType: "apartment",
    status: "ready",
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 0,
    isFeatured: false,
    isPublished: true,
    amenities: [{ value: "" }],
  };

  const { register, control, handleSubmit, formState: { errors } } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues,
  });

  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({
    control,
    name: "amenities",
  });

  const onSubmit = async (data: PropertyFormValues) => {
    setIsLoading(true);
    try {
      // Format data for API
      const formattedData = {
        ...data,
        amenities: data.amenities.map(a => a.value).filter(Boolean),
      };

      // Mock API call
      console.log("Saving property:", formattedData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push("/admin/properties");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/properties" className="p-2 text-foreground-secondary hover:text-foreground transition-colors rounded-full hover:bg-background-secondary">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-3xl font-medium text-foreground">
            {initialData ? "Edit Property" : "Add Property"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-display font-medium mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Title</label>
              <input {...register("title")} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-gold" />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Slug</label>
              <input {...register("slug")} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-gold" />
            </div>
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Property Type</label>
              <select {...register("propertyType")} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-gold">
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Builder/Developer</label>
              <input {...register("builderName")} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-gold" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Description</label>
              <textarea {...register("description")} rows={4} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-gold" />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-display font-medium mb-6">Pricing & Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Price</label>
              <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-gold" />
            </div>
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Unit (Cr, L)</label>
              <input {...register("priceUnit")} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-gold" />
            </div>
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Status</label>
              <select {...register("status")} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-accent-gold">
                <option value="ready">Ready to Move</option>
                <option value="upcoming">Upcoming</option>
                <option value="under-construction">Under Construction</option>
              </select>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" {...register("isFeatured")} className="rounded border-border text-accent-gold focus:ring-accent-gold" />
                Featured Property
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" {...register("isPublished")} className="rounded border-border text-accent-gold focus:ring-accent-gold" />
                Published
              </label>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-display font-medium mb-6">Features</h2>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Bedrooms</label>
              <input type="number" {...register("bedrooms", { valueAsNumber: true })} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Bathrooms</label>
              <input type="number" {...register("bathrooms", { valueAsNumber: true })} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">Area (Sq.Ft)</label>
              <input type="number" {...register("areaSqft", { valueAsNumber: true })} className="w-full bg-background border border-border rounded-lg py-2 px-3 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-4">Amenities</label>
            <div className="space-y-3">
              {amenityFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`amenities.${index}.value`)}
                    placeholder="e.g. Swimming Pool"
                    className="flex-1 bg-background border border-border rounded-lg py-2 px-3 text-sm"
                  />
                  <button type="button" onClick={() => removeAmenity(index)} className="p-2 text-foreground-muted hover:text-red-500 rounded-lg hover:bg-background-secondary">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => appendAmenity({ value: "" })} className="text-sm text-accent-gold hover:text-white flex items-center gap-1 mt-2">
                <Plus className="h-4 w-4" /> Add Amenity
              </button>
            </div>
          </div>
        </GlassCard>

        <div className="flex justify-end gap-4 pb-12">
          <Link href="/admin/properties" className="px-6 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-background-secondary transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-accent-gold text-background px-6 py-2.5 rounded-lg font-accent text-sm font-medium uppercase hover:shadow-gold transition-all disabled:opacity-70">
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
