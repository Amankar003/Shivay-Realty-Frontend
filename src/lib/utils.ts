import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Indian currency notation
 * Example: 350 (in Lakhs) → "₹3.5 Cr"
 * Example: 85 (in Lakhs) → "₹85 L"
 */
export function formatPrice(priceLakhs: number, unit?: string): string {
  if (unit) {
    return `₹${priceLakhs} ${unit}`;
  }
  if (priceLakhs >= 100) {
    const crores = priceLakhs / 100;
    return `₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(1)} Cr`;
  }
  return `₹${priceLakhs} L`;
}

/**
 * Format a number with commas (Indian numbering system)
 * Example: 1234567 → "12,34,567"
 */
export function formatIndianNumber(num: number): string {
  const str = num.toString();
  let result = "";
  const len = str.length;

  if (len <= 3) return str;

  result = str.slice(-3);
  let remaining = str.slice(0, -3);

  while (remaining.length > 2) {
    result = remaining.slice(-2) + "," + result;
    remaining = remaining.slice(0, -2);
  }

  if (remaining.length > 0) {
    result = remaining + "," + result;
  }

  return result;
}

/**
 * Format area in sq.ft with commas
 * Example: 2500 → "2,500 sq.ft"
 */
export function formatArea(sqft: number): string {
  return `${formatIndianNumber(sqft)} sq.ft`;
}

/**
 * Generate a URL-safe slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text to a max length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Get status badge label for property
 */
export function getStatusLabel(
  status: "upcoming" | "under-construction" | "ready-to-move"
): string {
  const labels = {
    upcoming: "New Launch",
    "under-construction": "Under Construction",
    "ready-to-move": "Ready to Move",
  };
  return labels[status] || status;
}

/**
 * Get property type display label
 */
export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    apartment: "Apartment",
    villa: "Villa",
    penthouse: "Penthouse",
    commercial: "Commercial",
    plot: "Plot",
    townhouse: "Townhouse",
  };
  return labels[type] || type;
}

/**
 * Delay utility for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format ISO date string to readable format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
