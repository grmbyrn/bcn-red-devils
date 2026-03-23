"use client";

import { motion } from "framer-motion";
import { useI18n } from "../lib/i18n";
import React from "react";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();

  // Use `self-center` so the toggle sits exactly centered in the nav flex row
  const containerClass = compact
    ? "relative inline-flex items-center self-center w-10 h-5 rounded-full cursor-pointer"
    : "relative inline-flex items-center self-center -translate-y-0.5 w-12 h-6 rounded-full cursor-pointer";

  const knobClass = compact
    ? "relative inline-flex w-5 h-5 bg-white rounded-full shadow items-center justify-center"
    : "relative inline-flex w-6 h-6 bg-white rounded-full shadow items-center justify-center";

  // Align knob flush to edges to avoid showing track peeking on the left
  const knobX = compact ? (lang === "en" ? 0 : 20) : lang === "en" ? 0 : 24;
  // For English: white track, red knob, white text (better contrast over dark hero)
  // For Spanish: primary track, white knob, black text
  const bgColor = lang === "en" ? "#ffffff" : "var(--color-primary)";

  const knobStyle: React.CSSProperties = lang === "en"
    ? { backgroundColor: "var(--color-primary)", border: "none" }
    : { backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.06)" };

  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return (
    <div
      role="switch"
      aria-checked={lang === "es" ? "true" : "false"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      onClick={toggle}
      className={containerClass}
      aria-label="Toggle language"
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: bgColor }}
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />

      <motion.span className={knobClass} style={knobStyle} layout animate={{ x: knobX }} transition={{ type: "spring", stiffness: 700, damping: 30 }}>
        <span className="text-[10px] font-bold" style={{ color: lang === "en" ? "#ffffff" : "var(--color-black)" }}>
          {lang === "en" ? "EN" : "ES"}
        </span>
      </motion.span>
    </div>
  );
}
