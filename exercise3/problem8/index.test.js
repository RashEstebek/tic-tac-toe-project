import { describe, expect, test } from "vitest";
import longestTime from "./index";

describe("exercise1 - problem8", () => {
	test.each([
		{h: 1, m: 59, s: 3598, expected: 1},
		{h: 2, m: 300, s: 15000, expected: 300},
		{h: 15, m: 955, s: 59400, expected: 59400},
		{h: 1, m: 60, s: 3600, expected: 3600},
	])(".longestTime($h, $m, $s)", ({h, m, s, expected}) => {
		expect(longestTime(h, m, s)).toBe(expected);
	});
});
