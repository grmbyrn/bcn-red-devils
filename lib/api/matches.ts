import type { SimpleMatch } from "../types/match";

/**
 * Fetch the next matches from the internal API route.
 * @param signal optional AbortSignal for cancellation
 */
export async function getNextMatches(signal?: AbortSignal): Promise<SimpleMatch[]> {
  try {
    const res = await fetch("/api/matches", { signal });
    if (!res.ok) throw new Error(`Failed to fetch matches: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data.matches) ? (data.matches as SimpleMatch[]) : [];
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      // Cancellation — treat as non-error and return an empty list so callers can distinguish
      // aborts from real failures.
      return [];
    }
    throw err;
  }
}

export default getNextMatches;
