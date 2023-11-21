import { describe, expect, test } from "vitest";
import Person from "./index";

describe("exercise4 - problem1", () => {
  const p1 = new Person("Samuel", 24);
  const p2 = new Person("Joel", 36);
  const p3 = new Person("Lily", 24);

  test.each([
    {
      output: p1.compareAge(p2),
      expected: "Joel is older than me.",
    },
    {
      output: p1.compareAge(p3),
      expected: "Lily is the same age as me.",
    },
    {
      output: p2.compareAge(p1),
      expected: "Samuel is younger than me.",
    },
    {
      output: p2.compareAge(p3),
      expected: "Lily is younger than me.",
    },
    {
      output: p3.compareAge(p1),
      expected: "Samuel is the same age as me.",
    },
    {
      output: p3.compareAge(p2),
      expected: "Joel is older than me.",
    },
  ])(".compareAge", ({ output, expected }) => {
    expect(output).toBe(expected);
  });
});
