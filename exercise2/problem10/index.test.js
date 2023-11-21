import { describe, expect, test } from "vitest";
import getStudentsWithNamesAndTopNotes from "./index";

describe("exercise2 - problem10", () => {
  test.each([
    {
      students: [
        { name: "John", notes: [3, 5, 4] },
        { name: "Max", notes: [1, 4, 6] },
        { name: "Zygmund", notes: [1, 2, 3] },
      ],
      expected: [
        { name: "John", topNote: 5 },
        { name: "Max", topNote: 6 },
        { name: "Zygmund", topNote: 3 },
      ],
    },
    {
      students: [
        { name: "John", notes: [5, 4, 3] },
        { name: "Max", notes: [3, 3, 3] },
        { name: "Zygmund", notes: [1, 2, 3] },
      ],
      expected: [
        { name: "John", topNote: 5 },
        { name: "Max", topNote: 3 },
        { name: "Zygmund", topNote: 3 },
      ],
    },
    {
      students: [
        { name: "John", notes: [] },
        { name: "Ewa", notes: [] },
        { name: "Zygmund", notes: [1, 2, 3] },
      ],
      expected: [
        { name: "John", topNote: 0 },
        { name: "Ewa", topNote: 0 },
        { name: "Zygmund", topNote: 3 },
      ],
    },
  ])(
    ".getStudentsWithNamesAndTopNotes($students)",
    ({ students, expected }) => {
      expect(getStudentsWithNamesAndTopNotes(students)).toEqual(expected);
    }
  );
});
