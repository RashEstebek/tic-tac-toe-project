import { describe, expect, test } from "vitest";
import makeTitleCase from "./index";

describe("exercise1 - problem4", () => {
	test.each([
		{text: "I am a title", expected: "I Am A Title"},
		{text: "I AM A TITLE", expected: "I AM A TITLE"},
		{text: "i aM a tITLE", expected: "I AM A TITLE"},
		{
			text: "the first letter of every word is capitalized",
			expected: "The First Letter Of Every Word Is Capitalized",
		},
		{text: "I Like Pizza", expected: "I Like Pizza"},
		{
			text: "Don't count your ChiCKens BeFore They HatCh",
			expected: "Don't Count Your ChiCKens BeFore They HatCh",
		},
		{
			text: "All generalizations are false, including this one",
			expected: "All Generalizations Are False, Including This One",
		},
		{
			text: "Me and my wife lived happily for twenty years and then we met.",
			expected:
				"Me And My Wife Lived Happily For Twenty Years And Then We Met.",
		},
		{
			text: "There are no stupid questions, just stupid people.",
			expected: "There Are No Stupid Questions, Just Stupid People.",
		},
		{
			text: "1f you c4n r34d 7h15, you r34lly n33d 2 g37 l41d",
			expected: "1f You C4n R34d 7h15, You R34lly N33d 2 G37 L41d",
		},
	])('.makeTitleCase("$text")', ({text, expected}) => {
		expect(makeTitleCase(text)).toBe(expected);
	});
});
