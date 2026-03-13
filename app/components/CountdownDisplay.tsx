"use client";

import { type Countdown } from "../../lib/time";

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

export default function CountdownDisplay({ remaining }: { remaining: Countdown }) {
  return (
    <>
      <TimePill label="DAYS" value={remaining.days} />
      <Separator />
      <TimePill label="HRS" value={remaining.hours} />
      <Separator />
      <TimePill label="MIN" value={remaining.minutes} />
      <Separator />
      <TimePill label="SEC" value={remaining.seconds} />
    </>
  );
}
