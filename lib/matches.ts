export type SimpleMatch = {
  id: number;
  utcDate: string;
  competition: string | null;
  homeTeam: string;
  awayTeam: string;
  status?: string;
};