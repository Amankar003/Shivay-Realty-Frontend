"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/data/navigation";
import { useUIStore } from "@/store/ui-store";

export function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu, setMobileMenuOpen } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  if (!isMounted) return null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "glass-heavy py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group relative z-50 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span className="font-display text-2xl font-semibold tracking-wide text-foreground transition-colors group-hover:text-accent-gold md:text-3xl">
              Shivaay
            </span>
            <span className="hidden font-accent text-sm tracking-[0.2em] text-accent-gold md:inline-block">
              REALTY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative font-accent text-sm tracking-wider uppercase transition-colors hover:text-accent-gold",
                    isActive ? "text-accent-gold font-medium" : "text-foreground-secondary"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-gold"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact#site-visit"
              className="hidden items-center justify-center rounded-md border border-accent-gold px-6 py-2.5 font-accent text-sm font-medium tracking-wide text-accent-gold uppercase transition-all duration-300 hover:bg-accent-gold hover:text-background hover:shadow-gold md:inline-flex"
            >
              Book a Visit
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 backdrop-blur-md transition-colors hover:bg-accent-gold/20 md:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-accent-gold" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-background-secondary pt-24 pb-8 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block font-display text-4xl font-medium tracking-wide transition-colors",
                        isActive ? "text-accent-gold" : "text-foreground hover:text-accent-gold"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto flex flex-col gap-8"
            >
              <div className="h-[1px] w-full bg-border" />
              
              <div className="flex flex-col gap-2">
                <span className="overline text-foreground-muted">Get in Touch</span>
                <a href={`mailto:${SITE_CONFIG.email}`} className="font-accent text-lg hover:text-accent-gold">
                  {SITE_CONFIG.email}
                </a>
                <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="font-accent text-lg hover:text-accent-gold">
                  {SITE_CONFIG.phone}
                </a>
              </div>

              <Link
                href="/contact#site-visit"
                className="flex w-full items-center justify-center rounded-md bg-accent-gold px-6 py-4 font-accent text-sm font-medium tracking-wide text-background uppercase shadow-gold transition-transform hover:scale-[1.02] active:scale-95"
              >
                Book a Site Visit
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
