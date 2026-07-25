"use client";

import Image from "next/image";
import { Play, CheckCircle2 } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { ScrollReveal, SectionHeader } from "@/components/shared";
import { useState } from "react";

// Types
interface Video {
  title: string;
  description: string;
  url: string;
  category: string;
}

const featuredVideos: Video[] = [
  {
    title: "10 Most Expensive Penthouses For Sale In Mumbai!",
    description: "Explore the most luxurious and expensive penthouses currently available in Mumbai's prime real estate market.",
    url: "https://youtu.be/KTB7b14wK3U?si=DZjOF3eE_scSSXKh",
    category: "Luxury Tour",
  },
  {
    title: "Top 5 Upcoming Luxury Projects In Goa",
    description: "Discover the best investment opportunities in Goa's rapidly growing luxury real estate sector for 2026.",
    url: "https://youtu.be/N24RV7rlsWw?si=H_O4loBauIDFx_hG",
    category: "Investment Guide",
  },
  {
    title: "What 100 Crores Gets You In Mumbai",
    description: "A comprehensive guide and walkthrough of ultra-luxury properties in the 100 Crore segment.",
    url: "https://youtu.be/e5RUa3RWWww?si=IrSshbHNPHG7-URa",
    category: "Property Tips",
  }
];

function extractVideoId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^?&]+)/);
  return match ? match[1] : null;
}

function YouTubeThumbnail({ videoId, alt, className }: { videoId: string, alt: string, className?: string }) {
  const [src, setSrc] = useState(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className}
      onError={() => {
        if (src.includes("maxresdefault")) {
          setSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        }
      }}
    />
  );
}

export function KnowledgeHub() {
  return (
    <section className="dark relative py-24 bg-background text-foreground">
      {/* Background elements matching existing theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent-gold/5 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-luxury relative z-10 mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <SectionHeader
            overline="Official Channel"
            title="Exclusive YouTube Videos"
            subtitle="Discover expert property insights, luxury home tours, investment opportunities, and real estate guidance straight from our official channel."
            alignment="center"
          />
        </div>

        {/* Channel Intro Card */}
        <ScrollReveal delay={0.1}>
          <div className="glass rounded-3xl bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] p-6 md:p-10 mb-12 flex flex-col lg:flex-row items-center justify-between gap-8 hover:border-accent-gold/20 transition-colors duration-500">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left flex-1">
              <div className="relative h-24 w-24 rounded-full overflow-hidden shrink-0 ring-2 ring-accent-gold/30 flex items-center justify-center bg-accent-gold/10">
                <span className="text-accent-gold font-display text-4xl">S</span>
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h3 className="font-display text-2xl font-medium text-foreground">Shivaay Realty</h3>
                  <CheckCircle2 className="h-5 w-5 text-accent-gold" />
                </div>
                <p className="text-foreground-muted font-accent text-sm tracking-wide mb-3">@shivaay_Realty</p>
                <p className="text-foreground-secondary leading-relaxed max-w-2xl">
                  Helping home buyers and investors make smarter property decisions through educational real estate content.
                </p>
              </div>
            </div>
            
            <a 
              href="https://www.youtube.com/@shivaay_Realty"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-black border border-accent-gold text-accent-gold px-8 py-4 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] shrink-0"
            >
              <FaYoutube className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Visit YouTube Channel</span>
              <div className="absolute inset-0 bg-accent-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>
          </div>
        </ScrollReveal>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVideos.map((video, index) => {
            const videoId = extractVideoId(video.url);
            
            return (
              <ScrollReveal key={index} delay={0.1 * index}>
                <a 
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full glass rounded-[24px] bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-accent-gold/40 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  aria-label={`Watch ${video.title} on YouTube`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-black shrink-0">
                    {videoId && (
                      <YouTubeThumbnail 
                        videoId={videoId} 
                        alt={video.title} 
                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-gold group-hover:border-accent-gold/50 group-hover:text-background">
                        <Play className="h-6 w-6 ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {video.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-medium text-foreground line-clamp-2 mb-3 leading-snug group-hover:text-accent-gold transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary line-clamp-3 mb-6 flex-1">
                      {video.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-accent-gold text-sm font-medium uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      <FaYoutube className="h-4 w-4" /> Watch on YouTube
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
