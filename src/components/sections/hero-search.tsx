"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Home, IndianRupee, Layers } from "lucide-react";

export function HeroSearch() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="w-full max-w-6xl mx-auto glass-heavy rounded-[24px] p-6 lg:p-8 relative z-30"
    >
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 items-end">
        {/* Location */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-accent font-semibold uppercase tracking-[0.15em] text-foreground-muted">Location</label>
          <div className="relative flex items-center border-b border-border/60 pb-2 transition-colors hover:border-accent-gold group">
            <MapPin className="absolute left-0 h-5 w-5 text-accent-gold" strokeWidth={1.5} />
            <select className="w-full bg-transparent pl-8 pr-4 text-sm font-medium text-foreground focus:outline-none appearance-none cursor-pointer">
              <option value="">Any Location</option>
              <option value="mumbai">Mumbai</option>
              <option value="pune">Pune</option>
              <option value="goa">Goa</option>
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-accent font-semibold uppercase tracking-[0.15em] text-foreground-muted">Property Type</label>
          <div className="relative flex items-center border-b border-border/60 pb-2 transition-colors hover:border-accent-gold group">
            <Home className="absolute left-0 h-5 w-5 text-accent-gold" strokeWidth={1.5} />
            <select className="w-full bg-transparent pl-8 pr-4 text-sm font-medium text-foreground focus:outline-none appearance-none cursor-pointer">
              <option value="">Any Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-accent font-semibold uppercase tracking-[0.15em] text-foreground-muted">Budget</label>
          <div className="relative flex items-center border-b border-border/60 pb-2 transition-colors hover:border-accent-gold group">
            <IndianRupee className="absolute left-0 h-5 w-5 text-accent-gold" strokeWidth={1.5} />
            <select className="w-full bg-transparent pl-8 pr-4 text-sm font-medium text-foreground focus:outline-none appearance-none cursor-pointer">
              <option value="">Any Budget</option>
              <option value="1-5">₹1 Cr - ₹5 Cr</option>
              <option value="5-10">₹5 Cr - ₹10 Cr</option>
              <option value="10+">₹10 Cr +</option>
            </select>
          </div>
        </div>

        {/* Configuration */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] font-accent font-semibold uppercase tracking-[0.15em] text-foreground-muted">Configuration</label>
          <div className="relative flex items-center border-b border-border/60 pb-2 transition-colors hover:border-accent-gold group">
            <Layers className="absolute left-0 h-5 w-5 text-accent-gold" strokeWidth={1.5} />
            <select className="w-full bg-transparent pl-8 pr-4 text-sm font-medium text-foreground focus:outline-none appearance-none cursor-pointer">
              <option value="">Any Config</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
              <option value="4bhk+">4 BHK +</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-end pt-2 md:pt-0">
          <button
            type="button"
            className="h-[52px] w-full bg-foreground hover:bg-foreground/90 text-background rounded-[16px] flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            <Search className="h-5 w-5" />
            <span className="font-accent text-sm font-medium tracking-wider uppercase lg:hidden">Search</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
