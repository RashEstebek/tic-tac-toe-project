import { describe, expect, test } from "vitest"; 
import numOfDigits from "./index";

describe("exercise1 - problem1", () => {
  test.each([
    { int: 13124, expected: 5 },
    { int: 0, expected: 1 },
    { int: -12381428, expected: 8 },
    { int: 12, expected: 2 },
    { int: 42, expected: 2 },
    { int: 1000, expected: 4 },
    { int: 136, expected: 3 },
    { int: 1000000000, expected: 10 },
    { int: 2147483647, expected: 10 },
    { int: -2147483647, expected: 10 },
  ])(".numOfDigits($int)", ({ int, expected }) => {
    expect(numOfDigits(int)).toBe(expected);
  });
});
