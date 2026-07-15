"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Clock, Search } from "lucide-react";
import { apiClient } from "@/services/api-client";
import { GlassCard } from "@/components/shared";
import { formatDate } from "@/lib/utils";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const data = await apiClient.getLeads();
        setLeads(data as any[]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadLeads();
  }, []);

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-500 border border-blue-500/20">New</span>;
      case 'contacted':
        return <span className="inline-flex items-center rounded-full bg-accent-gold/10 px-2.5 py-0.5 text-xs font-medium text-accent-gold border border-accent-gold/20">Contacted</span>;
      default:
        return <span className="inline-flex items-center rounded-full bg-background-secondary px-2.5 py-0.5 text-xs font-medium text-foreground-secondary border border-border">Closed</span>;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Leads</h1>
          <p className="text-foreground-secondary mt-1">Manage inquiries and site visits.</p>
        </div>
      </div>

      <GlassCard className="border-border/50 bg-background/60 flex-1 flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent-gold transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full min-h-[300px]">
              <div className="w-8 h-8 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-xs font-accent tracking-wider uppercase text-foreground-muted bg-background-secondary/30">
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Inquiry Type</th>
                  <th className="p-4 font-medium">Received</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-foreground-secondary">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-background-secondary/20 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-foreground text-sm">{lead.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-foreground-secondary">
                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
                          <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize text-sm text-foreground">{lead.inquiryType.replace('-', ' ')}</span>
                      </td>
                      <td className="p-4 text-sm text-foreground-secondary">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatDate(lead.createdAt)}</span>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-sm text-accent-gold hover:text-white transition-colors font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
