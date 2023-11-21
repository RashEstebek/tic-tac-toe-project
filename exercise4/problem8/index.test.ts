import { describe, expect, test, vi } from "vitest";
import Calculator from "./index";

type Call =
  | {
      method: "logResult";
      log: number;
    }
  | {
      method: "add" | "subtract" | "multiply" | "divide";
      arg: number;
    };

describe("exercise4 - problem8", () => {
  const cases: { first: number; calls: Call[] }[] = [
    {
      first: 10,
      calls: [
        {
          method: "add",
          arg: 10,
        },
        {
          method: "subtract",
          arg: 5,
        },
        {
          method: "divide",
          arg: 5,
        },
        {
          method: "multiply",
          arg: 3,
        },
        {
          method: "logResult",
          log: 9,
        },
        {
          method: "add",
          arg: 2,
        },
      ],
    },
    {
      first: 2,
      calls: [
        {
          method: "add",
          arg: 12,
        },
        {
          method: "subtract",
          arg: 6,
        },
        {
          method: "divide",
          arg: 2,
        },
        {
          method: "multiply",
          arg: 1,
        },
        {
          method: "logResult",
          log: 4,
        },
        {
          method: "subtract",
          arg: 2,
        },
        {
          method: "logResult",
          log: 2,
        },
      ],
    },
  ];

  test.each(cases)(".calc($first)", ({ first, calls }) => {
    const consoleLogMock = vi.spyOn(console, "log");
    const calc = new Calculator(first);

    for (const call of calls) {
      if (call.method != "logResult") {
        calc[call.method](call.arg);
      } else {
        calc[call.method]();
        expect(consoleLogMock).toHaveBeenCalledWith(call.log);
      }
    }
  });
});
