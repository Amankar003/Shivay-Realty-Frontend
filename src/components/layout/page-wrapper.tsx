"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/shared";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col pt-24 md:pt-28">
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
