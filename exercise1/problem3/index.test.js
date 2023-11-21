import { describe, expect, test } from "vitest";
import pentagonal from "./index";

describe("exercise1 - problem3", () => {
  test.each([
    { level: 1, expected: 1 },
    { level: 3, expected: 16 },
    { level: 8, expected: 141 },
    { level: 10, expected: 226 },
    { level: 15, expected: 526 },
    { level: 33, expected: 2641 },
    { level: 43, expected: 4516 },
    { level: 13, expected: 391 },
    { level: 50, expected: 6126 },
    { level: 62, expected: 9456 },
    { level: 21, expected: 1051 },
  ])(".pentagonal($level)", ({ level, expected }) => {
    expect(pentagonal(level)).toBe(expected);
  });
});
