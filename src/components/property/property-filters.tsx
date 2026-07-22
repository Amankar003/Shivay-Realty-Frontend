"use client";

import { Search, Filter, X, Loader2, MapPin, Building2, User2, Tag } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PropertyType, PropertyStatus } from "@/types";
import { getPropertyTypeLabel, getStatusLabel } from "@/lib/utils";
import { ScrollReveal } from "@/components/shared";
import { propertyService, SearchSuggestion } from "@/services/property-service";

interface PropertyFiltersProps {
  onFilterChange: (filters: {
    type: PropertyType | "all";
    status: PropertyStatus | "all";
    city: string | "all";
    search: string;
    sortBy: string;
  }) => void;
  cities: string[];
  isLoading?: boolean;
}

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Featured", value: "featured" },
  { label: "Ready to Move", value: "ready-to-move" },
  { label: "New Launch", value: "new-launch" },
];

const SUGGESTION_ICONS: Record<string, React.ReactNode> = {
  Project: <Building2 className="h-3.5 w-3.5" />,
  Builder: <User2 className="h-3.5 w-3.5" />,
  City: <MapPin className="h-3.5 w-3.5" />,
  Location: <MapPin className="h-3.5 w-3.5" />,
  Type: <Tag className="h-3.5 w-3.5" />,
};

export function PropertyFilters({ onFilterChange, cities, isLoading }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [type, setType] = useState<PropertyType | "all">("all");
  const [status, setStatus] = useState<PropertyStatus | "all">("all");
  const [city, setCity] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Autocomplete state
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestionsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced filter application
  const applyFilters = useCallback(
    (overrides?: Partial<{ type: PropertyType | "all"; status: PropertyStatus | "all"; city: string | "all"; search: string; sortBy: string }>) => {
      onFilterChange({
        type: overrides?.type ?? type,
        status: overrides?.status ?? status,
        city: overrides?.city ?? city,
        search: overrides?.search ?? search,
        sortBy: overrides?.sortBy ?? sortBy,
      });
    },
    [onFilterChange, type, status, city, search, sortBy]
  );

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      applyFilters({ search });
    }, 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch suggestions
  useEffect(() => {
    if (suggestionsTimer.current) clearTimeout(suggestionsTimer.current);

    if (search.trim().length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsFetchingSuggestions(true);
    suggestionsTimer.current = setTimeout(async () => {
      const results = await propertyService.getSuggestions(search);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setIsFetchingSuggestions(false);
    }, 200);

    return () => {
      if (suggestionsTimer.current) clearTimeout(suggestionsTimer.current);
    };
  }, [search]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearch(suggestion.label);
    setShowSuggestions(false);
    applyFilters({ search: suggestion.label });
  };

  const handleClearSearch = () => {
    setSearch("");
    setSuggestions([]);
    setShowSuggestions(false);
    applyFilters({ search: "" });
  };

  const handleReset = () => {
    setType("all");
    setStatus("all");
    setCity("all");
    setSearch("");
    setSortBy("newest");
    setSuggestions([]);
    setShowSuggestions(false);
    onFilterChange({ type: "all", status: "all", city: "all", search: "", sortBy: "newest" });
  };

  const handleFilterApply = (key: string, value: string) => {
    const overrides: any = {};
    if (key === "type") { setType(value as any); overrides.type = value; }
    if (key === "status") { setStatus(value as any); overrides.status = value; }
    if (key === "city") { setCity(value); overrides.city = value; }
    if (key === "sortBy") { setSortBy(value); overrides.sortBy = value; }
    applyFilters(overrides);
  };

  const types: PropertyType[] = ["apartment", "villa", "penthouse", "commercial", "plot", "townhouse"];
  const statuses: PropertyStatus[] = ["upcoming", "under-construction", "ready-to-move"];

  return (
    <ScrollReveal direction="up" duration={0.6}>
      <div className="bg-background-secondary/50 backdrop-blur-md border border-border/50 rounded-2xl p-4 md:p-6 mb-12 shadow-sm">

        {/* Top Bar: Search & Mobile Toggle */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted" />
              <input
                type="text"
                placeholder="Search by project, builder, city, type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-20 text-sm text-foreground focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30 transition-all placeholder:text-foreground-muted/70"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowSuggestions(false);
                    applyFilters({ search });
                  }
                  if (e.key === "Escape") {
                    handleClearSearch();
                  }
                }}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
              />

              {/* Loading / Clear icons */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isLoading || isFetchingSuggestions ? (
                  <Loader2 className="h-4 w-4 text-accent-gold animate-spin" />
                ) : null}
                {search && (
                  <button
                    onClick={handleClearSearch}
                    className="p-1 rounded-full hover:bg-background-secondary transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-foreground-muted" />
                  </button>
                )}
              </div>

              {/* Autocomplete Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-50 top-full mt-2 w-full bg-background border border-border/60 rounded-xl shadow-lg overflow-hidden"
                  >
                    {suggestions.map((s, i) => (
                      <button
                        key={`${s.label}-${s.type}-${i}`}
                        onClick={() => handleSuggestionClick(s)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-background-secondary transition-colors border-b border-border/30 last:border-b-0"
                      >
                        <span className="text-accent-gold">
                          {SUGGESTION_ICONS[s.type] || <Search className="h-3.5 w-3.5" />}
                        </span>
                        <span className="flex-1 font-medium text-foreground">
                          {s.label}
                        </span>
                        <span className="text-[11px] font-accent uppercase tracking-wider text-foreground-muted bg-background-secondary/80 px-2 py-0.5 rounded-full">
                          {s.type}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 transition-all duration-300 ${isOpen ? "block" : "hidden md:grid"}`}>

          {/* City Filter */}
          <select
            value={city}
            onChange={(e) => handleFilterApply("city", e.target.value)}
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
            onChange={(e) => handleFilterApply("type", e.target.value)}
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
            onChange={(e) => handleFilterApply("status", e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors appearance-none"
          >
            <option value="all">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{getStatusLabel(s)}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => handleFilterApply("sortBy", e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors appearance-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className={`flex justify-end gap-3 mt-4 transition-all duration-300 ${isOpen ? "flex" : "hidden md:flex"}`}>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 text-sm font-accent tracking-wide text-foreground-secondary hover:text-foreground transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </ScrollReveal>
  );
}
