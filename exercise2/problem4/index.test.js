import { describe, expect, test } from "vitest";
import numInStr from "./index";

describe("exercise2 - problem4", () => {
  test.each([
    { arr: ["abc", "abc10"], expected: ["abc10"] },
    { arr: ["abc", "ab10c", "a10bc", "bcd"], expected: ["ab10c", "a10bc"] },
    { arr: ["1", "a", " ", "b"], expected: ["1"] },
    { arr: ["rct", "ABC", "Test", "xYz"], expected: [] },
    {
      arr: ["this IS", "10xYZ", "xy2K77", "Z1K2W0", "xYz"],
      expected: ["10xYZ", "xy2K77", "Z1K2W0"],
    },
    { arr: ["-/>", "10bc", "abc "], expected: ["10bc"] },
  ])(".numInStr($arr)", ({ arr, expected }) => {
    expect(numInStr(arr)).toEqual(expected);
  });
});
