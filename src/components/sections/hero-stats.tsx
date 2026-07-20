"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, Users, Award } from "lucide-react";

export function HeroStats() {
  const stats = [
    { value: "500+", label: "Properties", icon: <Building2 className="h-6 w-6" /> },
    { value: "1-4", label: "BHK Range", icon: <ShieldCheck className="h-6 w-6" /> },
    { value: "₹8k+", label: "Starting Rent", icon: <Award className="h-6 w-6" /> },
    { value: "24/7", label: "Support", icon: <Users className="h-6 w-6" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full max-w-6xl mx-auto glass-heavy rounded-[24px] p-6 lg:p-10 relative z-30"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-border">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`flex flex-col items-center justify-center pt-8 sm:pt-0 ${
              index !== 0 ? 'lg:pl-8' : ''
            } ${index !== stats.length - 1 ? 'lg:pr-8' : ''}`}
          >
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-accent-gold/10 text-accent-gold mb-4 transition-transform hover:scale-110">
              {stat.icon}
            </div>
            <span className="font-display text-4xl font-bold text-foreground mb-2 tracking-tight">
              {stat.value}
            </span>
            <span className="font-accent text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
