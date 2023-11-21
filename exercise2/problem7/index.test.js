import { describe, expect, test } from "vitest";
import afterNYears from "./index";

describe("exercise2 - problem7", () => {
  test.each([
    {
      list: {
        Joel: 32,
        Fred: 44,
        Reginald: 65,
        Susan: 33,
        Julian: 13,
      },
      years: 1,
      expected: {
        Joel: 33,
        Fred: 45,
        Reginald: 66,
        Susan: 34,
        Julian: 14,
      },
    },
    {
      list: {
        Baby: 2,
        Child: 8,
        Teenager: 15,
        Adult: 25,
        Elderly: 71,
      },
      years: 19,
      expected: {
        Baby: 21,
        Child: 27,
        Teenager: 34,
        Adult: 44,
        Elderly: 90,
      },
    },
    {
      list: {
        Genie: 1000,
        Joe: 40,
      },
      years: 5,
      expected: {
        Genie: 1005,
        Joe: 45,
      },
    },
    {
      list: {
        Adam: 0,
        Eve: 0,
      },
      years: 800,
      expected: {
        Adam: 800,
        Eve: 800,
      },
    },
    {
      list: {
        Adam: 0,
        Eve: 0,
      },
      years: 800,
      expected: {
        Adam: 800,
        Eve: 800,
      },
    },
    {
      list: {
        "Ambitious Old Scientist": 87,
        "Ambitious Scientist": 42,
        "Slightly Concerned Young Scientist": 23,
      },
      years: -35,
      expected: {
        "Ambitious Old Scientist": 122,
        "Ambitious Scientist": 77,
        "Slightly Concerned Young Scientist": 58,
      },
    },
    {
      list: {
        USA: 243,
        Person: 27,
      },
      years: 0,
      expected: {
        USA: 243,
        Person: 27,
      },
    },
  ])(".afterNYears($list, $years)", ({ list, years, expected }) => {
    expect(afterNYears(list, years)).toEqual(expected);
  });
});
