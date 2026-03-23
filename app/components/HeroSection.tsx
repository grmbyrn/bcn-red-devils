"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "../lib/i18n";
import { WHATSAPP_INVITE_URL } from "@/lib/constants";

// Use public images to avoid alias resolution issues during build
const heroImageSrc = "/images/hero-stadium.jpeg";
const clubCrestSrc = "/images/club-crest.png";

const HeroSection = () => {
  const { t } = useI18n();

  const scrollToMatches = () => {
    document.getElementById("upcoming-matches")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero relative w-full overflow-hidden">
      {/* Background image (full-bleed) */}
      <motion.img
        src={heroImageSrc}
        alt="Stadium"
        className="absolute inset-0 w-full h-full object-cover object-center"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* Dark gradient overlay (bottom-up) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.6) 35%, rgba(10,10,10,0.25) 70%, rgba(10,10,10,0) 100%)`,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 container flex flex-col items-center text-center px-6 gap-6 md:gap-8 lg:gap-10 -translate-y-12 md:-translate-y-16">
        <motion.img
          src={clubCrestSrc}
          alt="Red Devils BCN"
          className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
        />

        <div className="space-y-3 md:space-y-4 overflow-hidden">
          <motion.div
            className="section-label"
            style={{ color: "var(--color-primary)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t.clubSubtitle}
          </motion.div>

          <motion.h1
            className="hero-heading font-display leading-none uppercase text-white"
            data-testid="hero-heading"
            style={{ fontWeight: 900, fontSize: "clamp(56px, 8vw, 96px)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            className="text-base md:text-lg lg:text-xl text-muted max-w-md lg:max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {t.heroTagline}
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button
            onClick={scrollToMatches}
            className="btn-primary text-sm md:text-base uppercase tracking-[0.12em] font-semibold cursor-pointer"
            style={{ borderRadius: "2px" }}
          >
            {t.heroCtaPrimary}
          </button>
          <a
            href={WHATSAPP_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center gap-2 text-sm md:text-base uppercase tracking-[0.12em] font-semibold"
            style={{ background: "#000", color: "#fff" }}
          >
            {t.heroCtaSecondary}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToMatches}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.5 },
          y: { delay: 1.5, duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
};

export default HeroSection;
