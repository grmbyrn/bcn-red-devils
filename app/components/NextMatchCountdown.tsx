"use client";

import { useMemo } from "react";
import TeamCrest from "./TeamCrest";
import { useI18n } from "../lib/i18n";
import CountdownDisplay from "./CountdownDisplay";
import ScoreDisplay from "./ScoreDisplay";
import NoMatchMessage from "./NoMatchMessage";
import useNextMatch from "../../lib/hooks/useNextMatch";
import useCountdown from "../../lib/hooks/useCountdown";
import useMatchPolling from "../../lib/hooks/useMatchPolling";

export default function NextMatchCountdown({ targetDate }: { targetDate?: string }) {
  const { t } = useI18n();

  const { match, loading } = useNextMatch();
  const matchUtc = match?.utcDate ?? null;

  const effectiveTarget = useMemo(() => {
    if (targetDate) return new Date(targetDate);
    if (matchUtc) return new Date(matchUtc);
    return null;
  }, [targetDate, matchUtc]);

  const { remaining, isZero } = useCountdown(effectiveTarget);

  const matchId = match?.id ?? null;

  const { score, status } = useMatchPolling(matchId, Boolean(isZero && matchId));

  if (!effectiveTarget) {
    if (!loading && !match) return <NoMatchMessage />;
    return null;
  }

  return (
    <div id="next-match-countdown" className="sticky top-0 z-50 w-full">
      <div className="w-full" style={{ background: "var(--color-dark)" }}>
        <div className="max-w-5xl mx-auto w-full px-4 md:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TeamCrest name={match?.homeTeam} src={match?.homeCrest ?? null} size={40} />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm meta text-primary">{t.matchDay || "Next match"}</div>
            {score ? (
              <ScoreDisplay
                score={score}
                homeTeam={match?.homeTeam}
                awayTeam={match?.awayTeam}
                homeCrestUrl={match?.homeCrest ?? null}
                awayCrestUrl={match?.awayCrest ?? null}
                status={status ?? undefined}
              />
            ) : (
              <CountdownDisplay remaining={remaining} />
            )}
          </div>

          <div className="flex items-center gap-4">
            <TeamCrest name={match?.awayTeam} src={match?.awayCrest ?? null} size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
