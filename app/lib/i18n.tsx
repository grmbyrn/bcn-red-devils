import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "es";

const translations = {
  en: {
    home: "Home",
    events: "Events",
    news: "News",
    members: "Members",
    upcoming: "Upcoming Matches",
    latestNews: "Latest News",
    imGoing: "I'm Going",
    going: "Going",
    attendees: "attendees",
    viewAll: "View All",
    joinWhatsApp: "Join WhatsApp",
    followInstagram: "Follow on Instagram",
    matchDay: "Match Day",
    venue: "Venue",
    kickoff: "Kick-off",
    readMore: "Read More",
    clubTitle: "Red Devils BCN",
    clubSubtitle: "Manchester United Supporters Club · Barcelona",
    noEvents: "No upcoming events",
    quickLinks: "Quick Links",
    heroTitle: "Reds Barcelona",
    heroTagline: "Manchester United supporters in the heart of Catalonia",
    heroCtaPrimary: "View Next Match",
    heroCtaSecondary: "Join the Group",
  },
  es: {
    home: "Inicio",
    events: "Eventos",
    news: "Noticias",
    members: "Miembros",
    upcoming: "Próximos Partidos",
    latestNews: "Últimas Noticias",
    imGoing: "Voy",
    going: "Voy",
    attendees: "asistentes",
    viewAll: "Ver Todo",
    joinWhatsApp: "Unirse a WhatsApp",
    followInstagram: "Seguir en Instagram",
    matchDay: "Día de Partido",
    venue: "Lugar",
    kickoff: "Inicio",
    readMore: "Leer Más",
    clubTitle: "Red Devils BCN",
    clubSubtitle: "Peña del Manchester United · Barcelona",
    noEvents: "No hay eventos próximos",
    quickLinks: "Enlaces Rápidos",
    heroTitle: "Reds Barcelona",
    heroTagline: "Seguidores del Manchester United en el corazón de Cataluña",
    heroCtaPrimary: "Ver Próximo Partido",
    heroCtaSecondary: "Únete al Grupo",
  },
};

type Translations = typeof translations.en;

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}>({ lang: "en", setLang: () => {}, t: translations.en });

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
