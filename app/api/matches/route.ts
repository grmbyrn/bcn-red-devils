import { NextRequest, NextResponse } from "next/server";

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
    homeTeam?: { id?: number; name?: string } | null;
    awayTeam?: { id?: number; name?: string } | null;
    status?: string;
  };

  const fdMatches: FootballDataMatch[] = Array.isArray(data.matches) ? data.matches : [];

  // Map basic match shape and include team ids if present
  const matches = await Promise.all(
    fdMatches.map(async (m) => {
      const homeId = m.homeTeam?.id ?? null;
      const awayId = m.awayTeam?.id ?? null;

      // attempt to fetch crest urls for teams when ids are available
      let homeCrest: string | null = null;
      let awayCrest: string | null = null;

      const fetchTeam = async (id: number | null) => {
        if (!id) return null;
        try {
          const r = await fetch(`https://api.football-data.org/v4/teams/${id}`, {
            headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY ?? "" },
            next: { revalidate: 3600 },
          });
          if (!r.ok) return null;
          const teamJson = await r.json();
          return teamJson.crestUrl || teamJson.crest || teamJson.crestUrlSvg || null;
        } catch {
          return null;
        }
      };

      // fetch both in parallel
      const [hc, ac] = await Promise.all([fetchTeam(homeId), fetchTeam(awayId)]);
      homeCrest = hc;
      awayCrest = ac;

      return {
        id: m.id,
        utcDate: m.utcDate,
        competition: m.competition?.name ?? null,
        homeTeam: m.homeTeam?.name ?? "",
        awayTeam: m.awayTeam?.name ?? "",
        homeTeamId: homeId,
        awayTeamId: awayId,
        homeCrest,
        awayCrest,
        status: m.status,
      };
    })
  );

  return NextResponse.json({ matches });
}