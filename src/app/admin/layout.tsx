"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { LayoutDashboard, Building2, Users, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, admin, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isMounted, isAuthenticated, pathname, router]);

  if (!isMounted) return null; // Avoid hydration mismatch

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  if (!isAuthenticated) return null; // Will redirect via useEffect

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Leads", href: "/admin/leads", icon: Users },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background-secondary/30 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-background border-r border-border/50 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:block`}
      >
        <div className="h-16 flex items-center px-6 border-b border-border/50">
          <Link href="/admin/dashboard" className="font-display text-2xl font-medium tracking-wide">
            <span className="text-gradient-gold italic pr-1">Shivaay</span> Admin
          </Link>
          <button className="ml-auto lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5 text-foreground-secondary" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-accent-gold/10 text-accent-gold font-medium" 
                    : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-accent tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold font-display font-medium">
              {admin?.name.charAt(0) || "A"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{admin?.name}</p>
              <p className="text-xs text-foreground-muted truncate">{admin?.email}</p>
            </div>
            <button onClick={handleLogout} className="p-1.5 text-foreground-muted hover:text-red-400 transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-background border-b border-border/50 flex items-center px-4 lg:hidden sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-foreground-secondary hover:text-foreground">
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-4 font-display text-lg font-medium text-gradient-gold italic">Shivaay</span>
        </header>
        
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
