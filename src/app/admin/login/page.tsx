"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { apiClient } from "@/services/api-client";
import { GlassCard } from "@/components/shared";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@shivaayrealty.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const setAdmin = useAuthStore((state) => state.setAdmin);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await apiClient.login(email, password);
      setAdmin(response.admin);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-gold/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-md p-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-medium tracking-wide mb-2">
            <span className="text-gradient-gold italic pr-1">Shivaay</span> Admin
          </h1>
          <p className="text-foreground-secondary text-sm font-accent tracking-wider uppercase">
            Secure Portal Access
          </p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background/50 border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors"
                placeholder="admin@shivaayrealty.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-accent tracking-wider text-foreground-muted uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-background/50 border border-border rounded-lg py-3 px-4 text-sm text-foreground focus:outline-none focus:border-accent-gold transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full bg-accent-gold text-background py-3.5 rounded-lg font-accent text-sm font-medium tracking-widest uppercase transition-all hover:bg-white active:scale-95 disabled:opacity-70 disabled:hover:bg-accent-gold shadow-gold"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>
            
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
