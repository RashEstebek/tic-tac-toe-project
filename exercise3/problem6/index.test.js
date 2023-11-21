import { describe, expect, test } from "vitest";
import insertWhitespace from "./index";

describe("exercise1 - problem6", () => {
	test.each([
		{text: "SheWalksToTheBeach", expected: "She Walks To The Beach"},
		{text: "MarvinTalksTooMuch", expected: "Marvin Talks Too Much"},
		{text: "HopelesslyDevotedToYou", expected: "Hopelessly Devoted To You"},
		{
			text: "EvenTheBestFallDownSometimes",
			expected: "Even The Best Fall Down Sometimes",
		},
		{
			text: "TheGreatestUpsetInHistory",
			expected: "The Greatest Upset In History",
		},
	])(".insertWhitespace($text)", ({text, expected}) => {
		expect(insertWhitespace(text)).toBe(expected);
	});
});
