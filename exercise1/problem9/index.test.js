import { describe, expect, test } from "vitest";
import isDisarium from "./index";

describe("exercise1 - problem9", () => {
  test.each([
    { num: 6, expected: true },
    { num: 75, expected: false },
    { num: 135, expected: true },
    { num: 466, expected: false },
    { num: 372, expected: false },
    { num: 175, expected: true },
    { num: 1, expected: true },
    { num: 696, expected: false },
    { num: 876, expected: false },
    { num: 89, expected: true },
    { num: 518, expected: true },
    { num: 598, expected: true },
  ])(".isDisarium($num)", ({ num, expected }) => {
    expect(isDisarium(num)).toBe(expected);
  });
});
