"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { SimpleMatch } from "../../lib/matches";

export default function MatchesList() {
  const { t } = useI18n();
  const [matches, setMatches] = useState<SimpleMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    // Fetch only Manchester United games by default (teamId=66)
    fetch("/api/matches?teamId=66")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const payload = data as { matches?: SimpleMatch[]; error?: string };
        if (payload.matches) setMatches(payload.matches);
        else setError(payload.error ?? "No data");
      })
      .catch((e: unknown) => {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-sm text-red-600">{error}</div>;
  if (!matches || matches.length === 0) return <div className="text-sm text-muted">{t.noEvents}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {matches.slice(0, 4).map((m) => {
        const date = new Date(m.utcDate);
        const dt = date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
        return (
          <div key={m.id} className="p-4 border rounded-md bg-card">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted">{m.competition}</div>
              <div className="text-xs text-muted">{dt}</div>
            </div>
            <div className="mt-2 text-lg font-semibold">
              {m.homeTeam} <span className="mx-2 text-primary">vs</span> {m.awayTeam}
            </div>
          </div>
        );
      })}
    </div>
  );
}
