"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/services/api-client";
import { Building2, Users, Eye, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/shared";

interface DashboardStats {
  totalProperties: number;
  publishedProperties: number;
  totalLeads: number;
  newLeads: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiClient.getDashboardStats();
        setStats(data as DashboardStats);
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { title: "Total Properties", value: stats?.totalProperties || 0, icon: Building2, trend: "+2 this month" },
    { title: "Active Listings", value: stats?.publishedProperties || 0, icon: Eye, trend: "All visible" },
    { title: "Total Inquiries", value: stats?.totalLeads || 0, icon: Users, trend: "+12% vs last month" },
    { title: "New Leads", value: stats?.newLeads || 0, icon: CheckCircle2, trend: "Action required", highlight: true },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-medium text-foreground">Overview</h1>
        <p className="text-foreground-secondary mt-1">Welcome back to the Shivaay Admin Portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <GlassCard key={i} className={`p-6 border-border/50 bg-background/60 ${card.highlight ? 'border-accent-gold/30' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.highlight ? 'bg-accent-gold text-background' : 'bg-background-secondary text-foreground'}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <p className="text-sm font-accent tracking-wide text-foreground-secondary mb-1">
                  {card.title}
                </p>
                <h3 className="font-display text-3xl font-medium text-foreground mb-2">
                  {card.value}
                </h3>
                <p className={`text-xs ${card.highlight ? 'text-accent-gold' : 'text-foreground-muted'}`}>
                  {card.trend}
                </p>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Placeholders for Recent Activity lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-6 border-border/50 bg-background/60 h-96 flex flex-col">
          <h2 className="font-display text-xl font-medium mb-4">Recent Leads</h2>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl">
            <span className="text-foreground-muted font-accent text-sm">See Leads tab for details</span>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 border-border/50 bg-background/60 h-96 flex flex-col">
          <h2 className="font-display text-xl font-medium mb-4">Latest Properties</h2>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/50 rounded-xl">
            <span className="text-foreground-muted font-accent text-sm">See Properties tab for details</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
