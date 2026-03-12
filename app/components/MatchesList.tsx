"use client";

import { useEffect, useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import type { SimpleMatch } from "../../lib/matches";
type ExtendedMatch = SimpleMatch & { homeCrest?: string | null; awayCrest?: string | null };
import SkeletonCard from "./SkeletonCard";
import ErrorBox from "./ErrorBox";
import TeamCrest from "./TeamCrest";
import { fetcher } from "@/lib/fetcher";

export default function MatchesList() {
  const { t } = useI18n();
  const [matches, setMatches] = useState<SimpleMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetcher("/api/matches?teamId=66");
      const payload = data as { matches?: SimpleMatch[]; error?: string };
      if (payload.matches) setMatches(payload.matches);
      else setError(payload.error ?? "No data");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) return <ErrorBox message={error} onRetry={() => load()} />;

  if (!matches || matches.length === 0) return <div className="text-sm text-muted">{t.noEvents}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {matches.slice(0, 4).map((m) => {
        const date = new Date(m.utcDate);
        const dt = date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
        return (
          <article key={m.id} className="card">
            <div className="p-4">
              <div className="mb-2">
                <span className="section-label">{m.competition}</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <TeamCrest key={`h-${m.id}`} name={m.homeTeam} src={(m as ExtendedMatch).homeCrest ?? null} />
                    <div className="text-lg text-white font-semibold">{m.homeTeam}</div>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <TeamCrest key={`a-${m.id}`} name={m.awayTeam} src={(m as ExtendedMatch).awayCrest ?? null} />
                    <div className="text-lg text-white font-semibold">{m.awayTeam}</div>
                  </div>
                </div>

                <div className="text-xs text-muted">{dt}</div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
