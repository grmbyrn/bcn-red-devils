export interface MatchEvent {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  attendees: number;
  isLive?: boolean;
}

export interface NewsPost {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  imageUrl?: string;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  joinedDate: string;
  matchesAttended: number;
}

export const mockEvents: MatchEvent[] = [
  {
    id: "1",
    homeTeam: "Man United",
    awayTeam: "Liverpool",
    competition: "Premier League",
    date: "2026-03-15",
    time: "17:30",
    venue: "The George Payne",
    venueAddress: "Plaça d'Urquinaona, 5",
    attendees: 34,
    isLive: false,
  },
  {
    id: "2",
    homeTeam: "Man United",
    awayTeam: "Arsenal",
    competition: "FA Cup",
    date: "2026-03-22",
    time: "15:00",
    venue: "Flaherty's Irish Pub",
    venueAddress: "Plaça de Joaquim Xirau, 1",
    attendees: 21,
  },
  {
    id: "3",
    homeTeam: "Leicester",
    awayTeam: "Man United",
    competition: "Premier League",
    date: "2026-04-02",
    time: "20:00",
    venue: "Michael Collins Pub",
    venueAddress: "Plaça de la Sagrada Família, 4",
    attendees: 18,
  },
];

export const mockNews: NewsPost[] = [
  {
    id: "1",
    title: "Season Ticket Draw — Win a Trip to Old Trafford!",
    body: "We're raffling two season tickets for the 2026/27 season. Every member who attends 5+ watch parties is automatically entered. Draw on May 1st!",
    author: "Admin",
    date: "2026-03-04",
  },
  {
    id: "2",
    title: "New Venue Partnership with The George Payne",
    body: "Excited to announce our official partnership with The George Payne in Urquinaona. Reserved area for every match, drink specials for members!",
    author: "Admin",
    date: "2026-03-01",
  },
  {
    id: "3",
    title: "Photo Gallery: Derby Day Celebrations",
    body: "What a night! 45 members packed The George Payne for the Manchester Derby. Check out the photos on our Instagram.",
    author: "Admin",
    date: "2026-02-25",
  },
];

export const mockMembers: Member[] = [
  { id: "1", name: "Carlos M.", avatar: "CM", joinedDate: "2024-01", matchesAttended: 42 },
  { id: "2", name: "Sarah K.", avatar: "SK", joinedDate: "2024-03", matchesAttended: 38 },
  { id: "3", name: "Jordi P.", avatar: "JP", joinedDate: "2024-06", matchesAttended: 31 },
  { id: "4", name: "Emma W.", avatar: "EW", joinedDate: "2024-02", matchesAttended: 29 },
  { id: "5", name: "Miguel R.", avatar: "MR", joinedDate: "2025-01", matchesAttended: 15 },
  { id: "6", name: "Anna L.", avatar: "AL", joinedDate: "2025-04", matchesAttended: 12 },
  { id: "7", name: "David F.", avatar: "DF", joinedDate: "2024-09", matchesAttended: 25 },
  { id: "8", name: "Lucía S.", avatar: "LS", joinedDate: "2025-07", matchesAttended: 8 },
];
