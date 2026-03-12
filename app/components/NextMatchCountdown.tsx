"use client";

import { useEffect, useState } from "react";
import TeamCrest from "./TeamCrest";
import { useI18n } from "@/lib/i18n";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeParts(ms: number): Countdown {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / (24 * 3600));
  const hours = Math.floor((s % (24 * 3600)) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds };
}

export default function NextMatchCountdown({ targetDate }: { targetDate?: string }) {
  const { t } = useI18n();
  const [target, setTarget] = useState<Date | null>(null);
  const [homeTeam, setHomeTeam] = useState<string | null>(null);
  const [awayTeam, setAwayTeam] = useState<string | null>(null);
  const [homeCrestUrl, setHomeCrestUrl] = useState<string | null>(null);
  const [awayCrestUrl, setAwayCrestUrl] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Try to resolve target date: prop -> /api/matches -> fallback (next Saturday 20:00)
  useEffect(() => {
    if (targetDate) {
      setTarget(new Date(targetDate));
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/matches");
        if (!mounted) return;
        if (!res.ok) throw new Error("no matches");
        const json = await res.json();
        const m = Array.isArray(json.matches) ? json.matches[0] : null;
        if (m && m.utcDate) {
          setTarget(new Date(m.utcDate));
          setHomeTeam(m.homeTeam || null);
          setAwayTeam(m.awayTeam || null);
          // use crest urls if provided by the API
          setHomeCrestUrl(m.homeCrest ?? null);
          setAwayCrestUrl(m.awayCrest ?? null);
          return;
        }
      } catch {
        // ignore and fall through to fallback
      }

      // fallback: next Saturday at 20:00 local time
      const now = new Date();
      const day = now.getDay();
      const daysUntilSat = (6 - day + 7) % 7 || 7; // if today is sat, pick next week
      const sat = new Date(now);
      sat.setDate(now.getDate() + daysUntilSat);
      sat.setHours(20, 0, 0, 0);
      if (mounted) setTarget(sat);
    })();

    return () => {
      mounted = false;
    };
  }, [targetDate]);

  // ticking interval
  useEffect(() => {
    if (!target) return;
    const update = () => setRemaining(getTimeParts(target.getTime() - Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target) return null;

  return (
    <div id="next-match-countdown" className="sticky top-0 z-50 w-full">
      <div className="w-full" style={{ background: "var(--color-dark)" }}>
        <div className="max-w-5xl mx-auto w-full px-4 md:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TeamCrest name={homeTeam} src={homeCrestUrl} size={40} />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm meta text-primary">{t.matchDay || "Next match"}</div>
            <TimePill label="DAYS" value={remaining.days} />
            <Separator />
            <TimePill label="HRS" value={remaining.hours} />
            <Separator />
            <TimePill label="MIN" value={remaining.minutes} />
            <Separator />
            <TimePill label="SEC" value={remaining.seconds} />
          </div>

          <div className="flex items-center gap-4">
            <TeamCrest name={awayTeam} src={awayCrestUrl} size={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function TimePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center min-w-14">
      <div className="font-black text-white text-2xl md:text-3xl leading-none">{pad(value)}</div>
      <div className="text-xs tracking-[0.08em] text-muted uppercase">{label}</div>
    </div>
  );
}

function Separator() {
  return <div style={{ width: 2, height: 28, background: "var(--color-primary)" }} />;
}

// TeamCrest moved to shared component
