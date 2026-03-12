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

  // Collect unique team IDs to avoid 2N requests and rate limits
  const teamIdSet = new Set<number>();
  for (const m of fdMatches) {
    if (m.homeTeam?.id) teamIdSet.add(m.homeTeam.id);
    if (m.awayTeam?.id) teamIdSet.add(m.awayTeam.id);
  }

  const uniqueTeamIds = Array.from(teamIdSet);

  // Fetch each unique team once in parallel and store crestUrl in a Map<id, crest|null>
  const fetchTeamById = async (id: number) => {
    try {
      const r = await fetch(`https://api.football-data.org/v4/teams/${id}`, {
        headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY ?? "" },
        // cache team info for longer
        next: { revalidate: 86400 },
      });
      if (!r.ok) return null;
      const teamJson = await r.json();
      return teamJson.crestUrl || teamJson.crest || teamJson.crestUrlSvg || null;
    } catch {
      return null;
    }
  };

  const teamResults = await Promise.all(uniqueTeamIds.map((id) => fetchTeamById(id)));
  const teamCrestMap = new Map<number, string | null>();
  for (const [idx, id] of uniqueTeamIds.entries()) {
    teamCrestMap.set(id, teamResults[idx] ?? null);
  }

  // Map fdMatches to response using the crest map
  const matches = fdMatches.map((m) => {
    const homeId = m.homeTeam?.id ?? null;
    const awayId = m.awayTeam?.id ?? null;
    const homeCrest = homeId ? teamCrestMap.get(homeId) ?? null : null;
    const awayCrest = awayId ? teamCrestMap.get(awayId) ?? null : null;

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
  });

  return NextResponse.json({ matches });
}