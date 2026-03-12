type Translations = {
  home: string;
  events: string;
  news: string;
  members: string;
  upcoming: string;
  latestNews: string;
  imGoing: string;
  going: string;
  attendees: string;
  viewAll: string;
  joinWhatsApp: string;
  followInstagram: string;
  matchDay: string;
  venue: string;
  kickoff: string;
  readMore: string;
  clubTitle: string;
  clubSubtitle: string;
  noEvents: string;
  quickLinks: string;
  heroTitle: string;
  heroTagline: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
};

export function useI18n() {
  const t: Translations = {
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
  };

  return { t };
}

export type { Translations };
