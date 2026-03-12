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
  joinUs: string;
  heroTitle: string;
  heroTagline: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  about: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
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
    joinUs: "Join Us",
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
  };

  return { t };
}

export type { Translations };
