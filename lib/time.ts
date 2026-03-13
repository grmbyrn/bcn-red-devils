export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getTimeParts(ms: number): Countdown {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / (24 * 3600));
  const hours = Math.floor((s % (24 * 3600)) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds };
}
