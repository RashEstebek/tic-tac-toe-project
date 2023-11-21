import { describe, expect, test } from "vitest";
import Name from "./index";

describe("exercise4 - problem2", () => {
  test.each([
    {
      firstName: "john",
      lastName: "SMITH",
      expected: {
        firstName: "John",
        lastName: "Smith",
        fullName: "John Smith",
        initials: "J.S",
      },
    },
    {
      firstName: "sARah",
      lastName: "SMITH",
      expected: {
        firstName: "Sarah",
        lastName: "Smith",
        fullName: "Sarah Smith",
        initials: "S.S",
      },
    },
  ])(".Name", ({ firstName, lastName, expected }) => {
    const person = new Name(firstName, lastName);
    expect(person.firstName).toBe(expected.firstName);
    expect(person.lastName).toBe(expected.lastName);
    expect(person.fullName).toBe(expected.fullName);
    expect(person.initials).toBe(expected.initials);
  });
});
