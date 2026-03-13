"use client";

import { useEffect, useState, useCallback } from "react";
import type { SimpleMatch } from "../types/match";
import { getNextMatches } from "../api/matches";

export function useNextMatch() {
  const [match, setMatch] = useState<SimpleMatch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNext = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const matches = await getNextMatches(signal);
      const m = Array.isArray(matches) ? matches[0] ?? null : null;
      setMatch(m);
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        (err as { name?: unknown }).name === "AbortError"
      )
        return;
      let msg: string;
      if (typeof err === "string") msg = err;
      else if (err instanceof Error) msg = err.message;
      else msg = String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    fetchNext(ac.signal);
    return () => ac.abort();
  }, [fetchNext]);

  const refresh = useCallback(() => {
    const ac = new AbortController();
    fetchNext(ac.signal);
  }, [fetchNext]);

  return { match, loading, error, refresh };
}

export default useNextMatch;
