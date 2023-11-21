import { describe, expect, test } from "vitest";
import intWithinBounds from "./index";

describe("exercise1 - problem2", () => {
	test.each([
		{num: 3, lower: 1, upper: 9, expected: true},
		{num: 6, lower: 1, upper: 6, expected: false},
		{num: 4.5, lower: 3, upper: 8, expected: false},
		{num: -5, lower: 10, upper: 6, expected: true},
		{num: 4, lower: 0, upper: 0, expected: false},
		{num: 10, lower: 9, upper: 11, expected: true},
		{num: 6.3, lower: 2, upper: 6, expected: false},
		{num: 6.3, lower: 2, upper: 10, expected: false},
		{num: 9, lower: 2, upper: 3, expected: false},
		{num: 9, lower: 9, upper: 9, expected: false},
	])(
		".intWithinBounds($num, $lower, $upper)",
		({num, lower, upper, expected}) => {
			expect(intWithinBounds(num, lower, upper)).toBe(expected);
		}
	);
});
