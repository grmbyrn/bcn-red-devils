"use client";

import TeamCrest from "./TeamCrest";

export default function ScoreDisplay({
  score,
  homeTeam,
  awayTeam,
  homeCrestUrl,
  awayCrestUrl,
  status,
}: {
  score: { home: number | null; away: number | null };
  homeTeam?: string | null;
  awayTeam?: string | null;
  homeCrestUrl?: string | null;
  awayCrestUrl?: string | null;
  status?: string | null;
}) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center">
        <TeamCrest name={homeTeam} src={homeCrestUrl} size={40} />
        <div className="font-black text-white text-3xl md:text-4xl leading-none">{score.home ?? 0}</div>
        <div className="text-xs text-muted">{homeTeam}</div>
      </div>

      <div className="flex flex-col items-center">
        {status ? <div className="text-sm text-primary">{status}</div> : null}
      </div>

      <div className="flex flex-col items-center">
        <TeamCrest name={awayTeam} src={awayCrestUrl} size={40} />
        <div className="font-black text-white text-3xl md:text-4xl leading-none">{score.away ?? 0}</div>
        <div className="text-xs text-muted">{awayTeam}</div>
      </div>
    </div>
  );
}
