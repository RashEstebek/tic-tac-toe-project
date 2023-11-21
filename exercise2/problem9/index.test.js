import { describe, expect, test } from "vitest";
import duplicateNums from "./index";

describe("exercise2 - problem9", () => {
  test.each([
    { nums: [1, 2, 3, 4, 3, 5, 6], expected: [3] },
    { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], expected: [] },
    { nums: [20, 30, 40, 30, 20, 40], expected: [20, 30, 40] },
    { nums: [100, 59, 12, 13, 54, 76, 100, 14, 12], expected: [12, 100] },
    { nums: [81, 72, 43, 72, 81, 99, 99, 100, 12, 54], expected: [72, 81, 99] },
    { nums: [11, 22, 33, 44, 55, 44, 33, 22, 11], expected: [11, 22, 33, 44] },
  ])(".duplicateNums($nums)", ({ nums, expected }) => {
    expect(duplicateNums(nums)).toEqual(expected);
  });
});
