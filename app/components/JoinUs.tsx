"use client";

import { MessageCircle, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { WHATSAPP_INVITE_URL, INSTAGRAM_URL } from "@/lib/constants";
import Image from "next/image";
import { motion } from "framer-motion";

const JoinUs = () => {
  const { t } = useI18n();

  return (
    <motion.div className="card relative overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: 1.0, ease: "backOut" }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/man-utd-fans.jpg"
          alt="Fans"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 1200px"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute inset-0 z-10" style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />

      <div className="relative px-6 py-12 md:py-16 lg:py-20 max-w-5xl mx-auto z-20">
        <div className="min-h-40 flex items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-6 items-center w-full">
            <a
              href={WHATSAPP_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 rounded-lg text-lg font-bold text-white shadow-xl"
              style={{ background: "rgba(219, 18, 18, 0.95)", minWidth: 220 }}
              aria-label={t.joinWhatsApp}
            >
              <MessageCircle size={22} />
              <span>{t.joinWhatsApp}</span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 rounded-lg text-lg font-bold text-white shadow-xl"
              style={{ background: "#000", border: "1px solid rgba(255,255,255,0.08)", minWidth: 220 }}
              aria-label={t.followInstagram}
            >
              <Instagram size={22} />
              <span>{t.followInstagram}</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JoinUs;
