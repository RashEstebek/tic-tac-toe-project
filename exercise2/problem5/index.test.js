import { describe, expect, test } from "vitest";
import getBudgets from "./index";

describe("exercise2 - problem5", () => {
  test.each([
    {
      budgets: [
        { name: "John", age: 21, budget: 23000 },
        { name: "Steve", age: 32, budget: 40000 },
        {
          name: "Martin",
          age: 16,
          budget: 2700,
        },
      ],
      expected: 65700,
    },
    {
      budgets: [
        { name: "John", age: 21, budget: 29000 },
        { name: "Steve", age: 32, budget: 32000 },
        {
          name: "Martin",
          age: 16,
          budget: 1600,
        },
      ],
      expected: 62600,
    },
    {
      budgets: [
        { name: "John", age: 21, budget: 19401 },
        { name: "Steve", age: 32, budget: 12321 },
        {
          name: "Martin",
          age: 16,
          budget: 1204,
        },
      ],
      expected: 32926,
    },
    {
      budgets: [
        { name: "John", age: 21, budget: 10234 },
        { name: "Steve", age: 32, budget: 21754 },
        {
          name: "Martin",
          age: 16,
          budget: 4935,
        },
      ],
      expected: 36923,
    },
  ])(".getBudgets($budgets)", ({ budgets, expected }) => {
    expect(getBudgets(budgets)).toBe(expected);
  });
});
