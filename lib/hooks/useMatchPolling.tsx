"use client";

import { useEffect, useRef, useState } from "react";
import getMatchById from "../api/match";
import type { MatchScore } from "../types/match";
import { DEFAULT_POLL_INTERVAL_MS, FINISHED_STATUSES } from "../constants";

export function useMatchPolling(matchId: number | null, enabled = false, intervalMs = DEFAULT_POLL_INTERVAL_MS) {
  const [score, setScore] = useState<MatchScore | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // reset when disabled or no match
    if (!enabled || !matchId) {
      setScore(null);
      setStatus(null);
      setLoading(false);
      setError(null);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    let mounted = true;

    const fetchOnce = async () => {
      setLoading(true);
      setError(null);
      const ac = new AbortController();
      try {
        const m = await getMatchById(matchId, ac.signal);
        if (!mounted) return;
        if (!m) return;
        setStatus(m.status ?? null);
        setScore(m.score ?? null);
        // stop polling if match is finished
        if (m.status && FINISHED_STATUSES.includes(m.status as typeof FINISHED_STATUSES[number])) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } catch (err: unknown) {
        // narrow unknown to extract name/message safely
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
        if (mounted) setLoading(false);
      }
    };

    // initial fetch
    fetchOnce();
    // schedule polling
    intervalRef.current = window.setInterval(fetchOnce, intervalMs);

    return () => {
      mounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [matchId, enabled, intervalMs]);

  return { score, status, loading, error };
}

export default useMatchPolling;
