import { NextRequest, NextResponse } from "next/server";
import type { SimpleMatch } from "../../../lib/matches";

export async function GET(req: NextRequest) {
  const teamId = req.nextUrl.searchParams.get("teamId") ?? "66";

  const res = await fetch(
    `https://api.football-data.org/v4/teams/${teamId}/matches?status=SCHEDULED`,
    {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY ?? "" },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: `API error: ${res.status}` },
      { status: res.status }
    );
  }

  const data = await res.json();

  // Shape it into SimpleMatch[] with explicit types
  type FootballDataMatch = {
    id: number;
    utcDate: string;
    competition?: { name?: string } | null;
    homeTeam?: { name?: string } | null;
    awayTeam?: { name?: string } | null;
    status?: string;
  };

  const fdMatches: FootballDataMatch[] = Array.isArray(data.matches) ? data.matches : [];

  const matches: SimpleMatch[] = fdMatches.map((m) => ({
    id: m.id,
    utcDate: m.utcDate,
    competition: m.competition?.name ?? null,
    homeTeam: m.homeTeam?.name ?? "",
    awayTeam: m.awayTeam?.name ?? "",
    status: m.status,
  }));

  return NextResponse.json({ matches });
}