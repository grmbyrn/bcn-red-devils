"use client";

import { useEffect, useState } from "react";
import { getTimeParts, type Countdown } from "../time";

export function useCountdown(target?: Date | null) {
  const [remaining, setRemaining] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!target) return;
    let mounted = true;
    const update = () => {
      if (!mounted) return;
      setRemaining(getTimeParts(target.getTime() - Date.now()));
    };

    update();
    const id = setInterval(update, 1000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [target]);

  const isZero = remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0;

  return { remaining, isZero };
}

export default useCountdown;
