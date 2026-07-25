// Application-wide constants

export const SITE_CONFIG = {
  name: "Shivaay Realty",
  tagline: "Your Trusted Real Estate Partner",
  description:
    "Shivaay Realty specializes in premium residential rental solutions in Ranchi. We provide carefully selected apartments, guest houses, luxury residences, and family homes located in prime neighborhoods.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shivaayrealty.com",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://shivay-realty-backend-2.onrender.com/api/v1",
  email: "info@shivaayrealty.com",
  phone: "+91 6206825676",
  alternatePhone: "",
  address: {
    line1: "Ranchi",
    line2: "",
    city: "Ranchi",
    state: "Jharkhand",
    pincode: "",
    country: "India",
  },
  socialLinks: {
    instagram: "https://instagram.com/shivaayrealty",
    facebook: "https://facebook.com/shivaayrealty",
    linkedin: "https://linkedin.com/company/shivaayrealty",
    twitter: "https://x.com/shivaayrealty",
    youtube: "https://youtube.com/@shivaayrealty",
  },
  workingHours: "24/7 Customer Support",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Properties", href: "/projects" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
  support: [
    { label: "Apartment Rentals", href: "/projects" },
    { label: "Luxury Apartments", href: "/projects" },
    { label: "Guest Houses", href: "/projects" },
    { label: "Family Residences", href: "/projects" },
  ],
} as const;

export const PROPERTY_TYPES = [
  { label: "Luxury Apartment", value: "luxury-apartment" },
  { label: "Guest House", value: "guest-house" },
  { label: "Luxury Residence", value: "luxury-residence" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Duplex Apartment", value: "duplex-apartment" },
] as const;

export const PROPERTY_STATUSES = [
  { label: "Available", value: "available" },
  { label: "Rented", value: "rented" },
] as const;

export const PRICE_RANGES = [
  { label: "Under ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000 – ₹20,000", min: 10000, max: 20000 },
  { label: "₹20,000 – ₹50,000", min: 20000, max: 50000 },
  { label: "₹50,000+", min: 50000, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Rent: Low to High", value: "price-asc" },
  { label: "Rent: High to Low", value: "price-desc" },
  { label: "Name: A–Z", value: "name-asc" },
] as const;

export const CITIES = [
  "Ranchi",
] as const;

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5] as const;

export const METADATA_DEFAULTS = {
  title: "Shivaay Realty — Premium Residential Rentals in Ranchi",
  description:
    "Shivaay Realty specializes in premium residential rental solutions in Ranchi. We provide carefully selected apartments, guest houses, luxury residences, and family homes located in prime neighborhoods.",
  keywords: [
    "luxury apartment rentals Ranchi",
    "guest houses Ranchi",
    "premium residences",
    "Shivaay Realty",
    "rent an apartment in Ranchi",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Shivaay Realty",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shivaayrealty",
  },
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    xslow: 0.8,
  },
  ease: {
    smooth: [0.25, 0.46, 0.45, 0.94],
    bounce: [0.68, -0.55, 0.265, 1.55],
    out: [0, 0, 0.2, 1],
  },
  stagger: {
    fast: 0.08,
    normal: 0.12,
    slow: 0.15,
  },
} as const;
