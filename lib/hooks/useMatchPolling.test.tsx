import { render, screen, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useMatchPolling from "./useMatchPolling";
import getMatchById from "../api/match";

vi.mock("../api/match", () => ({ default: vi.fn() }));

function TestComponent() {
  const { score, status } = useMatchPolling(1, true, 50);
  return (
    <div>
      <div data-testid="status">{status ?? "empty"}</div>
      <div data-testid="home">{score?.home ?? "empty"}</div>
    </div>
  );
}

describe("useMatchPolling", () => {
  it("polls and updates status/score until finished", async () => {
    vi.mocked(getMatchById).mockResolvedValueOnce({ id: 1, status: "IN_PLAY", score: { home: 1, away: 0 } });

    await act(async () => {
      render(<TestComponent />);
    });

    console.log("status after render:", screen.getByTestId("status").textContent);
    console.log("home after render:", screen.getByTestId("home").textContent);

    await waitFor(() => {
      console.log("waitFor tick, status:", screen.getByTestId("status").textContent);
      expect(screen.getByTestId("status").textContent).toBe("IN_PLAY");
    }, { timeout: 2000 });
  });
});