import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import printAsyncNumbers from "./index";

beforeAll(() => {
  vi.useFakeTimers();

  return () => {
    vi.useRealTimers();
  };
});

beforeEach(() => {
  return () => {
    vi.clearAllTimers();
    vi.resetAllMocks();
  };
});

describe("exercise5 - problem3", () => {
  test.each([{ n: 10 }, { n: 7 }, { n: 4 }])(
    "print from 1..$n with delay of each number",
    async ({ n }) => {
      const log = vi.spyOn(console, "log");

      printAsyncNumbers(n);

      expect(log).not.toBeCalled();

      for (let i = 1; i <= n; i++) {
        await vi.advanceTimersByTimeAsync(i * 1000);
        expect(log).toHaveBeenLastCalledWith(i);
      }
    }
  );
});
