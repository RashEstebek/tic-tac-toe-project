import { describe, expect, test } from "vitest";
import numbersSum from "./index";

describe("exercise2 - problem3", () => {
  test.each([
    { arr: [1, 2, "13", "4", "645"], expected: 3 },
    { arr: [true, false, "123", "75"], expected: 0 },
    { arr: [1, 2, 3, 4, 5, true], expected: 15 },
    { arr: ["abcd", 1234, false, true, 564, "hii"], expected: 1798 },
    { arr: ["abcd", "abc45", "assssd", true], expected: 0 },
    { arr: [], expected: 0 },
    { arr: ["cghyki", "cd", 12114, 786, true, "me", "bey"], expected: 12900 },
  ])(".numbersSum($arr)", ({ arr, expected }) => {
    expect(numbersSum(arr)).toEqual(expected);
  });
});
