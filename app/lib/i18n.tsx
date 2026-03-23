"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
    noNextMatch: "No upcoming matches listed.",
    venue: "Venue",
    kickoff: "Kick-off",
    readMore: "Read More",
    clubTitle: "Red Devils BCN",
    clubSubtitle: "Manchester United Supporters Club · Barcelona",
    noEvents: "No upcoming events",
    joinUs: "Join Us",
    quickLinks: "Quick Links",
    heroTitle: "Reds Barcelona",
    heroTagline: "Manchester United supporters in the heart of Catalonia",
    heroCtaPrimary: "View Next Match",
    heroCtaSecondary: "Join the Group",
    about: {
      paragraph1:
        "Red Devils BCN is a Manchester United supporters group based in Barcelona. Founded in 2025, we gather fans from across Catalonia to watch matches, organise meetups, and support the team together.",
      paragraph2:
        "We host regular match-viewing events at local venues, social gatherings, and community activities to bring Reds supporters together in a friendly, inclusive environment.",
      paragraph3:
        "New members are always welcome — join us to share the passion for Manchester United in Barcelona.",
    },
    whereWeWatch: {
      title: "Where We Watch",
      venueName: "McCarthy's Bar",
      address: "Via Laietana, 44, Ciutat Vella, 08003 Barcelona",
      description:
        "We gather at McCarthy's Bar to watch Manchester United matches with a lively, friendly crowd and great atmosphere. The venue offers screens, food and a strong community vibe — perfect for matchdays.",
    },
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
    noNextMatch: "No hay partidos próximos",
    venue: "Lugar",
    kickoff: "Inicio",
    readMore: "Leer Más",
    clubTitle: "Red Devils BCN",
    clubSubtitle: "Peña del Manchester United · Barcelona",
    noEvents: "No hay eventos próximos",
    joinUs: "Únete",
    quickLinks: "Enlaces Rápidos",
    heroTitle: "Los Rojos de Barcelona",
    heroTagline: "Seguidores del Manchester United en el corazón de Cataluña",
    heroCtaPrimary: "Ver Próximo Partido",
    heroCtaSecondary: "Únete al Grupo",
    about: {
      paragraph1:
        "Red Devils BCN es un grupo de aficionados del Manchester United con sede en Barcelona. Fundado en 2025, reunimos a seguidores de toda Cataluña para ver partidos, organizar encuentros y apoyar al equipo juntos.",
      paragraph2:
        "Organizamos eventos regulares para ver los partidos en locales de la zona, reuniones sociales y actividades comunitarias para reunir a los seguidores en un ambiente amigable e inclusivo.",
      paragraph3:
        "Siempre damos la bienvenida a nuevos miembros — únete para compartir la pasión por el Manchester United en Barcelona.",
    },
    whereWeWatch: {
      title: "Dónde Vemos",
      venueName: "McCarthy's Bar",
      address: "Via Laietana, 44, Ciutat Vella, 08003 Barcelona",
      description:
        "Nos reunimos en McCarthy's Bar para ver los partidos del Manchester United con un ambiente animado y acogedor. El local ofrece pantallas, comida y un ambiente comunitario perfecto para los días de partido.",
    },
  },
};

type Translations = typeof translations.en;

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}>({ lang: "en", setLang: () => {}, t: translations.en });

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // Initialize to 'en' on both server and first client render to avoid hydration
  // mismatches. Detect saved locale or navigator in a client-only effect.
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("rd_lang") as Lang | null;
    if (saved) {
      setTimeout(() => setLang(saved), 0);
      return;
    }
    if (navigator.language && navigator.language.startsWith("es")) {
      setTimeout(() => setLang("es"), 0);
    }
  }, []);

  // persist selection
  useEffect(() => {
    try {
      window.localStorage.setItem("rd_lang", lang);
    } catch {
    }
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
