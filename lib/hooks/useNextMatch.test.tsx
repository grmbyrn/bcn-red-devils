import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import useNextMatch from "./useNextMatch";

function TestComponent() {
  const { match, loading } = useNextMatch();
  return (
    <div>
      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="home">{match?.homeTeam ?? ""}</div>
      <div data-testid="away">{match?.awayTeam ?? ""}</div>
    </div>
  );
}

describe("useNextMatch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and exposes the next match", async () => {
    const fakeMatches = {
      matches: [
        { id: 1, utcDate: "2026-03-14T20:00:00Z", homeTeam: "Home FC", awayTeam: "Away FC" },
      ],
    };

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => fakeMatches }));

    render(<TestComponent />);

    await waitFor(() => expect(screen.getByTestId("home").textContent).toBe("Home FC"));
    expect(screen.getByTestId("away").textContent).toBe("Away FC");
  });
});
