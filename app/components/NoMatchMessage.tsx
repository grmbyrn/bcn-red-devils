"use client";

import { useI18n } from "../lib/i18n";

export default function NoMatchMessage() {
  const { t } = useI18n();
  return (
    <div id="next-match-countdown" className="sticky top-0 z-50 w-full">
      <div className="w-full" style={{ background: "var(--color-dark)" }}>
        <div className="max-w-5xl mx-auto w-full px-4 md:px-8 py-2 flex items-center justify-center">
          <div className="text-sm text-muted">{t.noNextMatch || "No upcoming matches listed."}</div>
        </div>
      </div>
    </div>
  );
}
