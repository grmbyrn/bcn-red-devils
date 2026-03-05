type Translations = {
  joinWhatsApp: string;
  followInstagram: string;
};

export function useI18n() {
  const t: Translations = {
    joinWhatsApp: "Join WhatsApp",
    followInstagram: "Follow on Instagram",
  };

  return { t };
}

export type { Translations };
