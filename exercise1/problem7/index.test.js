import { describe, expect, test } from "vitest";
import isPrimitive from "./index";

describe("exercise1 - problem7", () => {
  test.each([
    { arg: false, expected: true },
    { arg: -123, expected: true },
    { arg: 0, expected: true },
    { arg: "12/12/2011", expected: true },
    { arg: undefined, expected: true },
    { arg: null, expected: true },
    { arg: BigInt(9007199254740991), expected: true },
    { arg: Symbol("hello"), expected: true },
    { arg: new Date(), expected: false },
    { arg: () => null, expected: false },
    { arg: {}, expected: false },
    { arg: [1, 2, 3], expected: false },
  ])(".isPrimitive($arg)", ({ arg, expected }) => {
    expect(isPrimitive(arg)).toBe(expected);
  });
});
