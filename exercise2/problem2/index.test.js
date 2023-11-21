import { describe, expect, test } from "vitest";
import sortIt from "./index";

describe("exercise2 - problem2", () => {
  test.each([
    { arr: [4, 1, 3], expected: [1, 3, 4] },
    { arr: [[4], [1], [3]], expected: [[1], [3], [4]] },
    { arr: [4, [1], 3], expected: [[1], 3, 4] },
    { arr: [[4], 1, [3]], expected: [1, [3], [4]] },
    { arr: [[3], 4, [2], [5], 1, 6], expected: [1, [2], [3], 4, [5], 6] },
    { arr: [[3], 7, [9], [5], 1, 6], expected: [1, [3], [5], 6, 7, [9]] },
    {
      arr: [[3], 7, [9], [5], 1, 6, [0]],
      expected: [[0], 1, [3], [5], 6, 7, [9]],
    },
  ])(".sortIt($arr)", ({ arr, expected }) => {
    expect(sortIt(arr)).toEqual(expected);
  });
});
