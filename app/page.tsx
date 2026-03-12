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
        <section id="upcoming-matches" className="mt-4 md:mt-6 no-hover">
          <div className="flex items-center justify-between mb-2">
            <h2 className="section-title">{t.upcoming}</h2>
            <button
              className="flex items-center gap-0.5 text-xs md:text-sm text-primary font-semibold uppercase tracking-wide hover:underline"
            >
              {t.viewAll} <ChevronRight size={14} />
            </button>
          </div>
          <MatchesList />
        </section>

        {/* Latest News */}
        <section className="mt-4 md:mt-6 no-hover">
          <h2 className="section-title mb-2">{t.latestNews}</h2>
          <NewsList />
        </section>

        {/* Quick Links */}
        <section className="mt-4 md:mt-6 no-hover">
          <h2 className="section-title mb-2">{t.quickLinks}</h2>
          <QuickLinks />
        </section>
      </div>
    </div>
  );
}
