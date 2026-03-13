import type { MatchDetail } from "../types/match";

/**
 * Fetch match details by id from the internal API route.
 * Returns simplified `MatchDetail` or null on error.
 */
export async function getMatchById(id: number, signal?: AbortSignal): Promise<MatchDetail | null> {
  const res = await fetch(`/api/match/${id}`, { signal });
  if (!res.ok) return null;
  const data = await res.json();
  return data.match ?? null;
}

export default getMatchById;
