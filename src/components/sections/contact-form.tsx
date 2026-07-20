"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { ScrollReveal, GlassCard } from "@/components/shared";
import { inquiryService } from "@/services/inquiry-service";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const data = {
        name: `${formData.get('firstName')} ${formData.get('lastName')}`,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
    };
    
    try {
        await inquiryService.submitContact(data);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
        (e.target as HTMLFormElement).reset();
    } catch (err: any) {
        setError(err.message || "Something went wrong. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <ScrollReveal direction="up" delay={0.2} duration={0.6} className="h-full">
      <GlassCard className="p-8 md:p-10 border-border/50 h-full flex flex-col justify-center bg-background-secondary/20 shadow-2xl">
        <div className="mb-8">
          <h3 className="font-display text-2xl font-medium text-foreground mb-2">
            Send a Message
          </h3>
          <p className="text-foreground-secondary text-sm">
            Fill out the form below and one of our representatives will contact you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full bg-background border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full bg-background border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-background border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full bg-background border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">
              Inquiry Type
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full bg-background border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors appearance-none"
            >
              <option value="sales">Sales Inquiry</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="media">Media & Press</option>
              <option value="careers">Careers</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full bg-background border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors resize-none"
              placeholder="How can we help you?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-accent-gold px-8 py-4 font-accent text-sm font-medium tracking-wider text-background uppercase transition-transform hover:scale-[1.02] active:scale-95 shadow-gold w-full disabled:opacity-70 disabled:hover:scale-100"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? "Sending Message..." : "Send Message"}
              {!isSubmitting && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
            </span>
            <div className="absolute inset-0 z-0 bg-foreground/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </button>

          {isSuccess && (
            <div className="text-center text-green-500 text-sm animate-in fade-in slide-in-from-bottom-2">
              Your message has been sent successfully. We will get back to you soon.
            </div>
          )}
        </form>
      </GlassCard>
    </ScrollReveal>
  );
}
