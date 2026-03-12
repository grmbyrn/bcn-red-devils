"use client";

import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
// import { mockNews } from "@/lib/mock-data";
import MatchesList from "@/components/MatchesList";
import JoinUs from "./components/JoinUs";
import HeroSection from "@/components/HeroSection";
import NextMatchCountdown from "@/components/NextMatchCountdown";
import NewsList from "./components/NewsList";
import AboutUs from "@/components/AboutUs";
import WhereWeWatch from "@/components/WhereWeWatch";

export default function Home() {
  const { t } = useI18n();
  // const latestNews = mockNews.slice(0, 2);
  return (
    <div className="pb-4">
      {/* Hero */}
      <HeroSection />
      <NextMatchCountdown />

      {/* Content sections */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <AboutUs />
        <WhereWeWatch />

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
        <section id="latest-news" className="mt-4 md:mt-6 no-hover">
          <h2 className="section-title mb-2">{t.latestNews}</h2>
          <NewsList />
        </section>

        {/* Join Us */}
        <section id="join-us" className="mt-4 md:mt-6 no-hover">
          <h2 className="section-title mb-2">{t.joinUs}</h2>
          <JoinUs />
        </section>
      </div>
    </div>
  );
}
