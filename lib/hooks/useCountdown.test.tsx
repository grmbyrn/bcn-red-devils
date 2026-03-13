import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useCountdown from "./useCountdown";

function TestComponent({ target }: { target: Date }) {
  const { remaining } = useCountdown(target);
  return <div data-testid="secs">{remaining.seconds}</div>;
}

describe("useCountdown", () => {
  it("counts down seconds", async () => {
    vi.useFakeTimers();
    const now = Date.now();
    const target = new Date(now + 3000); // 3s ahead

    await act(async () => {
      render(<TestComponent target={target} />);
    });

    // initial render -> near 3 seconds (could be 2 or 3 depending timing)
    const initial = Number(screen.getByTestId("secs").textContent);
    expect([2, 3]).toContain(initial);

    // advance 1s
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    const after = Number(screen.getByTestId("secs").textContent);
    expect([1, 2]).toContain(after);

    vi.useRealTimers();
  });
});
