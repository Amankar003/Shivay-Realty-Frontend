// Application-wide constants

export const SITE_CONFIG = {
  name: "Shivaay Realty",
  tagline: "Your Trusted Real Estate Partner",
  description:
    "Shivaay Realty is a premium real estate brokerage and consultancy, connecting buyers with trusted developers and guiding you to your perfect home or investment.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shivaayrealty.com",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  email: "info@shivaayrealty.com",
  phone: "+91 98765 43210",
  alternatePhone: "+91 98765 43211",
  address: {
    line1: "Shivaay Tower, 15th Floor",
    line2: "Bandra Kurla Complex",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
    country: "India",
  },
  socialLinks: {
    instagram: "https://instagram.com/shivaayrealty",
    facebook: "https://facebook.com/shivaayrealty",
    linkedin: "https://linkedin.com/company/shivaayrealty",
    twitter: "https://x.com/shivaayrealty",
    youtube: "https://youtube.com/@shivaayrealty",
  },
  workingHours: "Mon – Sat: 10:00 AM – 7:00 PM",
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
    { label: "Book a Site Visit", href: "/contact#site-visit" },
    { label: "Customer Support", href: "/contact" },
  ],
} as const;

export const PROPERTY_TYPES = [
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Penthouse", value: "penthouse" },
  { label: "Commercial", value: "commercial" },
  { label: "Plot", value: "plot" },
  { label: "Townhouse", value: "townhouse" },
] as const;

export const PROPERTY_STATUSES = [
  { label: "New Launch", value: "upcoming" },
  { label: "Under Construction", value: "under-construction" },
  { label: "Ready to Move", value: "ready-to-move" },
] as const;

export const PRICE_RANGES = [
  { label: "Under ₹1 Cr", min: 0, max: 100 },
  { label: "₹1 Cr – ₹3 Cr", min: 100, max: 300 },
  { label: "₹3 Cr – ₹5 Cr", min: 300, max: 500 },
  { label: "₹5 Cr – ₹10 Cr", min: 500, max: 1000 },
  { label: "₹10 Cr+", min: 1000, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A–Z", value: "name-asc" },
] as const;

export const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Goa",
] as const;

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5] as const;

export const METADATA_DEFAULTS = {
  title: "Shivaay Realty — Premium Real Estate Brokerage",
  description:
    "Find the right property with Shivaay Realty. We offer expert property consultation, connecting you with trusted developers for luxury apartments, villas, and commercial spaces.",
  keywords: [
    "luxury real estate broker",
    "property consultancy",
    "premium apartments",
    "buy luxury villas",
    "Shivaay Realty",
    "trusted property advisors",
    "real estate investment India",
    "premium properties",
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
