import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import Timer from "./index";

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

type TimerObject = {
  h: number;
  m: number;
  s: number;
  ms: number;
};

type Operation =
  | {
      method: "log";
      log: TimerObject;
    }
  | {
      method: "start" | "pause" | "reset";
    }
  | {
      timeout: number;
    };

describe("exercise5 - problem4", () => {
  test("only public methods: ['start', 'pause', 'reset', 'log']", () => {
    const timer = new Timer();

    expect(Object.getOwnPropertyNames(Object.getPrototypeOf(timer))).toEqual([
      "constructor",
      "start",
      "pause",
      "reset",
      "log",
    ]);
    expect(Object.getOwnPropertyNames(timer)).toEqual([]);
  });

  describe("timer methods", () => {
    const table: { operations: Operation[] }[] = [
      {
        operations: [
          { method: "log", log: { h: 0, m: 0, s: 0, ms: 0 } },
          { method: "start" },
          { timeout: 1234 },
          { method: "log", log: { h: 0, m: 0, s: 1, ms: 234 } },
          { timeout: 4321 },
          { method: "log", log: { h: 0, m: 0, s: 5, ms: 555 } },
        ],
      },
      {
        operations: [
          { method: "start" },
          { timeout: 123456789 },
          { method: "log", log: { h: 34, m: 17, s: 36, ms: 789 } },
          { method: "pause" },
          { timeout: 123456789 },
          { method: "log", log: { h: 34, m: 17, s: 36, ms: 789 } },
          { method: "start" },
          { timeout: 123456789 },
          { method: "log", log: { h: 68, m: 35, s: 13, ms: 578 } },
        ],
      },
      {
        operations: [
          { method: "start" },
          { timeout: 1234 },
          { method: "log", log: { h: 0, m: 0, s: 1, ms: 234 } },
          { method: "pause" },
          { timeout: 1234 },
          { method: "log", log: { h: 0, m: 0, s: 1, ms: 234 } },
          { method: "reset" },
          { method: "log", log: { h: 0, m: 0, s: 0, ms: 0 } },
          { method: "start" },
          { timeout: 1234 },
          { method: "log", log: { h: 0, m: 0, s: 1, ms: 234 } },
          { method: "pause" },
          { method: "reset" },
          { timeout: 1234 },
          { method: "log", log: { h: 0, m: 0, s: 0, ms: 0 } },
        ],
      },
    ];

    test.each(table)(".timer -> $operations", ({ operations }) => {
      const consoleLogSpy = vi.spyOn(console, "log");
      const timer = new Timer();

      for (const operation of operations) {
        if ("method" in operation) {
          timer[operation.method]();

          if (operation.method === "log") {
            expect(consoleLogSpy).toHaveBeenLastCalledWith(operation.log);
          }

          continue;
        }

        if ("timeout" in operation) {
          vi.advanceTimersByTime(operation.timeout);
        }
      }
    });
  });
});
