import { describe, expect, test } from "vitest";
import mapping from "./index";

describe("exercise2 - problem6", () => {
  test.each([
    { arr: ["a", "b", "c"], expected: { a: "A", b: "B", c: "C" } },
    { arr: ["p", "s", "t"], expected: { p: "P", s: "S", t: "T" } },
    { arr: ["a", "v", "y", "z"], expected: { a: "A", v: "V", y: "Y", z: "Z" } },
  ])(".mapping($arr)", ({ arr, expected }) => {
    expect(mapping(arr)).toEqual(expected);
  });
});
