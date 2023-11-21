import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import printNumberInInterval from "./index";

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

describe("exercise5 - problem2", () => {
  test.each([{ n: 10 }, { n: 7 }, { n: 4 }])(
    "print from 1..$n with delay of 1 sec",
    async ({ n }) => {
      const log = vi.spyOn(console, "log");

      printNumberInInterval(n);

      expect(log).not.toBeCalled();

      for (let i = 1; i <= n; i++) {
        await vi.advanceTimersByTimeAsync(1000);
        expect(log).toHaveBeenLastCalledWith(i);
      }
    }
  );
});
