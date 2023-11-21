import { describe, expect, test } from "vitest";
import arrayOfMultiples from "./index";

describe("exercise2 - problem1", () => {
  test.each([
    { num: 7, len: 5, expected: [7, 14, 21, 28, 35] },
    { num: 12, len: 10, expected: [12, 24, 36, 48, 60, 72, 84, 96, 108, 120] },
    { num: 17, len: 7, expected: [17, 34, 51, 68, 85, 102, 119] },
    {
      num: 630,
      len: 14,
      expected: [
        630, 1260, 1890, 2520, 3150, 3780, 4410, 5040, 5670, 6300, 6930, 7560,
        8190, 8820,
      ],
    },
    { num: 140, len: 3, expected: [140, 280, 420] },
    { num: 7, len: 8, expected: [7, 14, 21, 28, 35, 42, 49, 56] },
    {
      num: 11,
      len: 21,
      expected: [
        11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132, 143, 154, 165, 176,
        187, 198, 209, 220, 231,
      ],
    },
  ])(".arrayOfMultiples($num, $len)", ({ num, len, expected }) => {
    expect(arrayOfMultiples(num, len)).toEqual(expected);
  });
});
