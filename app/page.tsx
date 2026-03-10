"use client";

import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
// import { mockNews } from "@/lib/mock-data";
import MatchesList from "@/components/MatchesList";
import NewsCard from "@/components/NewsCard";
import QuickLinks from "@/components/QuickLinks";
import HeroSection from "@/components/HeroSection";
import NewsList from "./components/NewsList";

export default function Home() {
  const { t } = useI18n();
  // const latestNews = mockNews.slice(0, 2);
  return (
    <div className="pb-4">
      {/* Hero */}
      <HeroSection />

      {/* Content sections */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Upcoming Matches */}
        <section id="upcoming-matches" className="mt-8 md:mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-2xl font-bold font-display text-foreground">{t.upcoming}</h2>
            <button
              // onClick={() => navigate("/events")}
              className="flex items-center gap-0.5 text-xs md:text-sm text-primary font-semibold uppercase tracking-wide hover:underline"
            >
              {t.viewAll} <ChevronRight size={14} />
            </button>
          </div>
          <MatchesList />
        </section>

        {/* Latest News */}
        <section className="mt-8 md:mt-12">
          <h2 className="text-lg md:text-2xl font-bold font-display text-foreground mb-4">Latest News</h2>
          <NewsList />
        </section>

        {/* Quick Links */}
        <section className="mt-8 md:mt-12">
          <h2 className="text-lg md:text-2xl font-bold font-display text-foreground mb-4">{t.quickLinks}</h2>
          <QuickLinks />
        </section>
      </div>
    </div>
  );
}
