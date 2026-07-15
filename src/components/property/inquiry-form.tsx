"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { GlassCard } from "@/components/shared";

interface InquiryFormProps {
  propertyName: string;
}

export function InquiryForm({ propertyName }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <GlassCard className="p-8 border-border/50 sticky top-24 shadow-2xl shadow-black/20">
      <div className="mb-6">
        <h3 className="font-display text-2xl font-medium text-foreground mb-2">
          Express Interest
        </h3>
        <p className="text-foreground-secondary text-sm">
          Register your interest in {propertyName} and our luxury advisors will contact you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full bg-background/50 border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full bg-background/50 border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            required
            className="w-full bg-background/50 border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors"
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={3}
            className="w-full bg-background/50 border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors resize-none"
            placeholder="I would like to schedule a site visit..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-accent-gold px-8 py-4 font-accent text-sm font-medium tracking-wider text-background uppercase transition-transform hover:scale-[1.02] active:scale-95 shadow-gold w-full disabled:opacity-70 disabled:hover:scale-100"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting ? "Sending..." : "Request Details"}
            {!isSubmitting && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
          </span>
          <div className="absolute inset-0 z-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
        </button>

        {isSuccess && (
          <div className="mt-2 text-center text-green-500 text-sm animate-in fade-in slide-in-from-bottom-2">
            Thank you. Our advisor will contact you shortly.
          </div>
        )}
      </form>
    </GlassCard>
  );
}
