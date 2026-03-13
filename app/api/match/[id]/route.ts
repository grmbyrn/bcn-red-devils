import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params?: unknown }) {
  // `context.params` may be a Promise in some Next versions, handle both cases
  let params: unknown = context.params;
  if (params && typeof (params as { then?: unknown }).then === "function") {
    try {
      params = await (params as Promise<unknown>);
    } catch {
      params = undefined;
    }
  }

  const id = (params && typeof params === "object" && params !== null ? (params as Record<string, unknown>)["id"] : undefined) as string | undefined;
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  try {
    const res = await fetch(`https://api.football-data.org/v4/matches/${id}`, {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY ?? "" },
      next: { revalidate: 5 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `API error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    const m = data?.match ?? null;
    if (!m) return NextResponse.json({ match: null });

    const fullTime = m.score?.fullTime ?? null;
    const result = {
      id: m.id ?? null,
      status: m.status ?? null,
      score: {
        home: fullTime?.home ?? (m.score?.winner === "HOME_TEAM" ? 1 : 0),
        away: fullTime?.away ?? (m.score?.winner === "AWAY_TEAM" ? 1 : 0),
      },
      minute: m.minute ?? null,
    };

    return NextResponse.json({ match: result });
  } catch {
    return NextResponse.json({ error: "fetch error" }, { status: 500 });
  }
}
