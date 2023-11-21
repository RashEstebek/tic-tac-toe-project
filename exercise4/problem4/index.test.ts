import { describe, expect, test } from "vitest";
import { Circle, Rectangle, sumOfAllAreas } from "./index";

describe("exercise4 - problem4", () => {
  test("DOES NOT inherits", () => {
    const circle = new Circle(2);
    const rect = new Rectangle(3, 2);

    expect(Object.getPrototypeOf(circle.constructor).name).toBe("");
    expect(Object.getPrototypeOf(rect.constructor).name).toBe("");
  });

  describe("find sum of all areas", () => {
    const circle1 = new Circle(2);
    const circle2 = new Circle(3);
    const rect1 = new Rectangle(2, 4);
    const rect2 = new Rectangle(3, 2);

    test.each([
      {
        shapes: [circle1, circle2],
        expected: 40,
      },
      {
        shapes: [rect1, rect2],
        expected: 14,
      },
      {
        shapes: [circle1, rect1],
        expected: 20,
      },
      {
        shapes: [circle1, rect2, circle2],
        expected: 46,
      },
      {
        shapes: [rect1, circle1, rect2, circle2],
        expected: 54,
      },
    ])(
      "Math.floor(sumOfAllAreas($shapes)) -> ~$expected",
      ({ shapes, expected }) => {
        expect(Math.floor(sumOfAllAreas(...shapes))).toBe(expected);
      }
    );
  });
});
