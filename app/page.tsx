"use client";

import { useI18n } from "@/lib/i18n";
// import { mockNews } from "@/lib/mock-data";
import MatchesList from "@/components/MatchesList";
import JoinUs from "@/components/JoinUs";
import HeroSection from "@/components/HeroSection";
import NextMatchCountdown from "@/components/NextMatchCountdown";
import NewsList from "@/components/NewsList";
import AboutUs from "@/components/AboutUs";
import WhereWeWatch from "@/components/WhereWeWatch";
import { motion } from "framer-motion";

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
        <motion.section
          className="mt-4 md:mt-6 no-hover"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "backOut" }}
        >
          <AboutUs />
        </motion.section>

        <motion.section
          className="mt-4 md:mt-6 no-hover"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "backOut" }}
        >
          <WhereWeWatch />
        </motion.section>

        {/* Upcoming Matches */}
        <motion.section
          id="upcoming-matches"
          className="mt-4 md:mt-6 no-hover"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "backOut" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="section-title">{t.upcoming}</h2>
          </div>
          <MatchesList />
        </motion.section>

        {/* Latest News */}
        <motion.section
          id="latest-news"
          className="mt-4 md:mt-6 no-hover"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "backOut" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="section-title">{t.latestNews}</h2>
          </div>
          <NewsList />
        </motion.section>

        {/* Join Us */}
        <motion.section
          id="join-us"
          className="mt-4 md:mt-6 no-hover"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "backOut" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="section-title">{t.joinUs}</h2>
          </div>
          <JoinUs />
        </motion.section>
      </div>
    </div>
  );
}
