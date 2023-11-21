import { describe, expect, test } from "vitest";
import is from "./index";

describe("exercise4 - problem7", () => {
  test.each([
    {
      method: "bool",
      arg: true,
      expected: true,
    },
    {
      method: "bool",
      arg: false,
      expected: true,
    },
    {
      method: "bool",
      arg: "false",
      expected: false,
    },
    {
      method: "num",
      arg: 20,
      expected: true,
    },
    {
      method: "num",
      arg: NaN,
      expected: true,
    },
    {
      method: "num",
      arg: {},
      expected: false,
    },
    {
      method: "str",
      arg: "Hello",
      expected: true,
    },
    {
      method: "str",
      arg: "",
      expected: true,
    },
    {
      method: "str",
      arg: 42,
      expected: false,
    },
    {
      method: "fun",
      arg: () => {},
      expected: true,
    },
    {
      method: "fun",
      arg: function () {},
      expected: true,
    },
    {
      method: "fun",
      arg: Date,
      expected: true,
    },
    {
      method: "fun",
      arg: true,
      expected: false,
    },
  ])('.is["$method"]($arg) -> expected', ({ method, arg, expected }) => {
    expect(is[method](arg)).toBe(expected);
  });
});
