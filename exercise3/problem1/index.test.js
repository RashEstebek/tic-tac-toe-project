import { describe, expect, test } from "vitest";
import concat from "./index";

describe("exercise2 - problem1", () => {
	test.each([
		{
			args: [
				[1, 2, 3],
				[4, 5],
				[6, 7],
			],
			expected: [1, 2, 3, 4, 5, 6, 7],
		},
		{
			args: [[1], [2], [3], [4], [5], [6], [7]],
			expected: [1, 2, 3, 4, 5, 6, 7],
		},
		{
			args: [
				[1, 2],
				[3, 4],
			],
			expected: [1, 2, 3, 4],
		},
		{args: [[4, 4, 4, 4, 4]], expected: [4, 4, 4, 4, 4]},
		{args: [["a"], ["b", "c"]], expected: ["a", "b", "c"]},
	])(".concat(...$args)", ({args, expected}) => {
		expect(concat(...args)).toEqual(expected);
	});
});
