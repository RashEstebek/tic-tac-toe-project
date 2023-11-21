import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import wait from "./index";

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

describe("exercise5 - problem5", () => {
  test("wait is async function", async () => {
    const w = wait(100);
    vi.runAllTimers();
    await expect(w).resolves.toBeUndefined();
  });
  test.each([{ timeout: 100 }, { timeout: 500 }, { timeout: 1000 }])(
    "wait needs to sleep for amount of $timeout ms",
    ({ timeout }) => {
      wait(timeout);

      expect(vi.getTimerCount()).toBe(1);

      vi.advanceTimersByTime(timeout);

      expect(vi.getTimerCount()).toBe(0);
    }
  );
});
