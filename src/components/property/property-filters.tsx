"use client";

import { Search, Filter, X } from "lucide-react";
import { useState } from "react";
import { PropertyType, PropertyStatus } from "@/types";
import { getPropertyTypeLabel, getStatusLabel } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared";

interface PropertyFiltersProps {
  onFilterChange: (filters: {
    type: PropertyType | "all";
    status: PropertyStatus | "all";
    city: string | "all";
    search: string;
  }) => void;
  cities: string[];
}

export function PropertyFilters({ onFilterChange, cities }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [type, setType] = useState<PropertyType | "all">("all");
  const [status, setStatus] = useState<PropertyStatus | "all">("all");
  const [city, setCity] = useState<string | "all">("all");
  const [search, setSearch] = useState("");

  const handleApply = () => {
    onFilterChange({ type, status, city, search });
  };

  const handleReset = () => {
    setType("all");
    setStatus("all");
    setCity("all");
    setSearch("");
    onFilterChange({ type: "all", status: "all", city: "all", search: "" });
  };

  const types: PropertyType[] = ["apartment", "villa", "penthouse", "commercial", "plot", "townhouse"];
  const statuses: PropertyStatus[] = ["upcoming", "under-construction", "ready-to-move"];

  return (
    <ScrollReveal direction="up" duration={0.6}>
      <div className="bg-background-secondary/50 backdrop-blur-md border border-border/50 rounded-2xl p-4 md:p-6 mb-12 shadow-sm">
        
        {/* Top Bar: Search & Mobile Toggle */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted" />
              <input
                type="text"
                placeholder="Search by project name or location..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  // Auto-apply search for better UX
                  onFilterChange({ type, status, city, search: e.target.value });
                }}
                className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-28 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors placeholder:text-foreground-muted/70"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onFilterChange({ type, status, city, search });
                  }
                }}
              />
              <button
                onClick={() => onFilterChange({ type, status, city, search })}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-accent-gold text-background text-xs font-accent tracking-wide uppercase font-bold px-4 py-2 rounded-lg hover:shadow-gold transition-all"
              >
                Search
              </button>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center gap-2 bg-background border border-border rounded-xl py-3 px-6 text-sm font-medium text-foreground"
          >
            <Filter className="h-4 w-4" />
            Filters {isOpen ? <X className="h-3 w-3 ml-1" /> : ""}
          </button>
        </div>

        {/* Filters Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden md:grid'}`}>
          
          {/* City Filter */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors appearance-none"
          >
            <option value="all">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType | "all")}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors appearance-none"
          >
            <option value="all">All Property Types</option>
            {types.map((t) => (
              <option key={t} value={t}>{getPropertyTypeLabel(t)}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PropertyStatus | "all")}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors appearance-none"
          >
            <option value="all">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{getStatusLabel(s)}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className={`flex justify-end gap-3 mt-4 transition-all duration-300 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 text-sm font-accent tracking-wide text-foreground-secondary hover:text-foreground transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2.5 bg-accent-gold text-background text-sm font-accent tracking-wide uppercase font-medium rounded-lg hover:shadow-gold transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}
