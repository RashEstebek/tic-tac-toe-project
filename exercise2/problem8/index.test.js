import { describe, expect, test } from "vitest";
import isEqual from "./index";

describe("exercise2 - problem8", () => {
  test.each([
    { obj1: {}, obj2: {}, expected: true },
    {
      obj1: {
        name: "Benny",
        phone: "3325558745",
        email: "benny@edabit.com",
      },
      obj2: {
        name: "Jason",
        phone: "9853759720",
        email: "jason@edabit.com",
      },
      expected: false,
    },
    {
      obj1: {
        name: "Jason",
        phone: "9853759720",
        email: "jason@edabit.com",
      },
      obj2: {
        name: "Jason",
        phone: "9853759720",
        email: "jason@edabit.com",
      },
      expected: true,
    },
    {
      obj1: {
        names: ["Tom", "Joe", "David"],
        fruitIds: {
          orangeId: 77634,
          appleId: 74323,
          bananaId: 9487,
        },
      },
      obj2: {
        names: ["Tom", "Joe", "Steve"],
        fruitIds: {
          orangeId: 77634,
          appleId: 74323,
          bananaId: 65970,
        },
      },
      expected: false,
    },
    {
      obj1: {
        foo: {
          bar: {
            baz: true,
          },
          baz: {
            arr: [1, 2, 3],
          },
        },
      },
      obj2: {
        foo: {
          bar: {
            baz: true,
          },
          baz: {
            arr: [3, 2, 1],
          },
        },
      },
      expected: false,
    },
    {
      obj1: {
        foo: {
          bar: {
            baz: "edabit.com",
          },
          baz: {
            userIds: {
              jason: 76397,
              steve: 73073,
              joe: 21076,
            },
          },
        },
      },
      obj2: {
        foo: {
          baz: {
            userIds: {
              jason: 76397,
              steve: 73073,
              joe: 21076,
            },
          },
          bar: {
            baz: "edabit.com",
          },
        },
      },
      expected: false,
    },
    {
      obj1: {
        foo: {
          bar: {
            baz: "edabit.com",
          },
          baz: {
            userIds: {
              jason: 76397,
              steve: 73073,
              joe: 21076,
            },
          },
        },
      },
      obj2: {
        foo: {
          bar: {
            baz: "edabit.com",
          },
          baz: {
            userIds: {
              jason: 76397,
              steve: 73073,
              joe: 21076,
            },
          },
        },
      },
      expected: true,
    },
  ])(".isEqual($obj1, $obj2)", ({ obj1, obj2, expected }) => {
    expect(isEqual(obj1, obj2)).toEqual(expected);
  });
});
