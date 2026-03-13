import { describe, it, expect } from "vitest";
import { getTimeParts } from "./time";

describe("getTimeParts", () => {
  it("returns zeros for non-positive ms", () => {
    expect(getTimeParts(0)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    expect(getTimeParts(-1000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });

  it("calculates days/hours/minutes/seconds correctly", () => {
    // 1 day, 2 hours, 3 minutes, 4 seconds
    const ms = (((1 * 24 + 2) * 60 + 3) * 60 + 4) * 1000;
    expect(getTimeParts(ms)).toEqual({ days: 1, hours: 2, minutes: 3, seconds: 4 });
  });
});
