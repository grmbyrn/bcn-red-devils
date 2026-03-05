import { ChevronDown, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import heroImage from "@/assets/hero-stadium.jpeg";
import clubCrest from "@/assets/club-crest.png";
import Image from "next/image";

const HeroSection = () => {
  const { t } = useI18n();

  const scrollToMatches = () => {
    document.getElementById("upcoming-matches")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen md:h-[80vh] lg:h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.img
        src={heroImage.src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6 md:gap-8 lg:gap-10 max-w-3xl mx-auto">
        <motion.img
          src={clubCrest.src}
          alt="Red Devils BCN"
          className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
        />

        <div className="space-y-3 md:space-y-4 overflow-hidden">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-display tracking-wider text-foreground leading-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-md lg:max-w-lg mx-auto"
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
            className="px-8 py-3 md:px-10 md:py-4 rounded-lg bg-gradient-red text-primary-foreground font-display text-sm md:text-base uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity animate-pulse-red"
          >
            {t.heroCtaPrimary}
          </button>
          <a
            href="https://chat.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3 md:px-10 md:py-4 rounded-lg border border-foreground/20 text-foreground font-display text-sm md:text-base uppercase tracking-widest font-semibold hover:bg-foreground/10 transition-colors"
          >
            <MessageCircle size={16} />
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
