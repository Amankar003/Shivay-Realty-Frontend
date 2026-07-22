"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SectionHeader, ScrollReveal } from "@/components/shared";
import { api } from "@/lib/api";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchFaqs = async () => {
      try {
        const data = await api.get<FAQ[]>("/faqs", undefined, { signal: controller.signal });
        setFaqs(data);
      } catch (error: any) {
        if (error.name !== 'AbortError' && error.message !== 'The user aborted a request.') {
          console.error("Failed to load FAQs", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaqs();

    return () => {
      controller.abort();
    };
  }, []);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="container-luxury relative z-10">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <SectionHeader
            overline="Common Questions"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about investing in luxury real estate with Shivaay Realty."
            alignment="center"
          />
        </div>

        {isLoading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-background-secondary rounded-xl h-16 border border-border/50" />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal
                key={faq.id}
                direction="up"
                delay={index * 0.1}
                duration={0.5}
              >
                <div 
                  className={`border border-border/60 rounded-2xl overflow-hidden transition-all duration-300 ${
                    openId === faq.id 
                      ? 'bg-background-secondary/80 border-accent-gold/30 shadow-[0_4px_20px_-10px_rgba(212,175,55,0.1)]' 
                      : 'bg-background hover:bg-background-secondary/40 hover:border-border'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex-shrink-0 transition-colors ${openId === faq.id ? 'text-accent-gold' : 'text-foreground-muted'}`}>
                        <HelpCircle className="w-5 h-5" />
                      </span>
                      <span className={`font-display text-lg sm:text-xl transition-colors ${openId === faq.id ? 'text-accent-gold' : 'text-foreground'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: openId === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`flex-shrink-0 ml-4 p-1 rounded-full ${openId === faq.id ? 'bg-accent-gold/10 text-accent-gold' : 'text-foreground-muted'}`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-0 ml-9">
                          <p className="text-foreground-secondary leading-relaxed">
                            {faq.answer}
                          </p>
                          <div className="mt-4 inline-block px-3 py-1 bg-background-tertiary rounded-full border border-border/50">
                            <span className="text-[11px] font-accent uppercase tracking-wider text-foreground-muted">
                              {faq.category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      {/* Decorative gradients */}
      <div className="pointer-events-none absolute left-0 top-1/2 w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
}
