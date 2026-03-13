export type SimpleMatch = {
  id: number;
  utcDate: string;
  competition: string | null;
  homeTeam: string;
  awayTeam: string;
  homeTeamId?: number | null;
  awayTeamId?: number | null;
  homeCrest?: string | null;
  awayCrest?: string | null;
  status?: string | null;
};

export type MatchScore = {
  home: number | null;
  away: number | null;
};

export type MatchDetail = {
  id: number;
  utcDate?: string | null;
  status?: string | null;
  minute?: number | null;
  homeTeam?: string | null;
  awayTeam?: string | null;
  homeCrest?: string | null;
  awayCrest?: string | null;
  score?: MatchScore | null;
};
