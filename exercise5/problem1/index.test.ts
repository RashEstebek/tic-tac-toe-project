import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import callbackExec from "./index";

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

describe("exercise5 - problem1", () => {
  test("execute function after 2 sec", async () => {
    const elapsed = {
      start: new Date(),
      end: new Date(),
    };

    const fn = vi.fn().mockImplementation(() => {
      elapsed.end = new Date();
    });

    elapsed.start = new Date();
    callbackExec(fn);

    vi.runAllTimers();

    expect(elapsed.end.getTime() - elapsed.start.getTime()).toBe(2000);
  });
});
