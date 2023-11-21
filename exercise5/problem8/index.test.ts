import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import fetchCharacterWithMovies from "./index";

const api = "https://swapi.dev/api";

const character = {
  name: "Darth Vader",
  films: [
    `${api}/films/1/`,
    `${api}/films/2/`,
    `${api}/films/3/`,
    `${api}/films/6/`,
  ],
};

const movies = [
  {
    title: "A New Hope",
  },
  {
    title: "The Empire Strikes Back",
  },
  {
    title: "Return of the Jedi",
  },
  {
    title: "Revenge of the Sith",
  },
];

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

describe("exercise5 - problem7", () => {
  test("fetch correct result", async () => {
    const expected = {
      name: character.name,
      films: character.films.map((_, i) => movies[i].title),
    };

    const characterId = 4;

    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockImplementationOnce(() => {
        const blob = new Blob([JSON.stringify(character, null, 2)], {
          type: "application/json",
        });

        const response = new Response(blob, {
          status: 200,
          statusText: "OK",
        });

        return Promise.resolve(response);
      })
      .mockImplementation((url: URL | RequestInfo) => {
        let path = "";

        if (url instanceof URL) {
          path = url.href;
        } else if (url instanceof Request) {
          path = url.url;
        } else {
          path = url;
        }

        let blob = new Blob();

        if (path.startsWith(`${api}/films/1`)) {
          blob = new Blob([JSON.stringify(movies[0], null, 2)], {
            type: "application/json",
          });
        }

        if (path.startsWith(`${api}/films/2`)) {
          blob = new Blob([JSON.stringify(movies[1], null, 2)], {
            type: "application/json",
          });
        }

        if (path.startsWith(`${api}/films/3`)) {
          blob = new Blob([JSON.stringify(movies[2], null, 2)], {
            type: "application/json",
          });
        }

        if (path.startsWith(`${api}/films/6`)) {
          blob = new Blob([JSON.stringify(movies[3], null, 2)], {
            type: "application/json",
          });
        }

        const response = new Response(blob, {
          status: 200,
          statusText: "OK",
        });

        return Promise.resolve(response);
      });

    await expect(fetchCharacterWithMovies(characterId)).resolves.toEqual(
      expected
    );
    expect(fetchMock).toBeCalledTimes(1 + movies.length);
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining(api));
  });

  test("fetch in parallel", async () => {
    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockImplementationOnce(() => {
        const blob = new Blob([JSON.stringify(character, null, 2)], {
          type: "application/json",
        });

        const response = new Response(blob, {
          status: 200,
          statusText: "OK",
        });

        return Promise.resolve(response);
      })
      .mockImplementation(async (url) => {
        let path = "";

        if (url instanceof URL) {
          path = url.href;
        } else if (url instanceof Request) {
          path = url.url;
        } else if (typeof url === "string") {
          path = url;
        }

        let blob = new Blob();

        if (path.startsWith(`${api}/films/1`)) {
          blob = new Blob([JSON.stringify(movies[0], null, 2)], {
            type: "application/json",
          });
        }

        if (path.startsWith(`${api}/films/2`)) {
          blob = new Blob([JSON.stringify(movies[1], null, 2)], {
            type: "application/json",
          });
        }

        if (path.startsWith(`${api}/films/3`)) {
          blob = new Blob([JSON.stringify(movies[2], null, 2)], {
            type: "application/json",
          });
        }

        if (path.startsWith(`${api}/films/6`)) {
          blob = new Blob([JSON.stringify(movies[3], null, 2)], {
            type: "application/json",
          });
        }

        const response = new Response(blob, {
          status: 200,
          statusText: "OK",
        });

        await wait(2000);

        return Promise.resolve(response);
      });

    expect(fetchMock).toBeCalledTimes(0);
    const resPromise = fetchCharacterWithMovies(4);
    expect(fetchMock).toBeCalledTimes(1);
    await vi.runOnlyPendingTimersAsync();
    await expect(resPromise).resolves.toStrictEqual({
      name: character.name,
      films: [
        movies[0].title,
        movies[1].title,
        movies[2].title,
        movies[3].title,
      ],
    });
    expect(fetchMock).toBeCalledTimes(1 + movies.length);
  });

  test("fail films result: 404", async () => {
    const characterId = 4;

    vi.spyOn(global, "fetch")
      .mockImplementationOnce(() => {
        const blob = new Blob([JSON.stringify(character, null, 2)], {
          type: "application/json",
        });

        const response = new Response(blob, {
          status: 200,
          statusText: "OK",
        });

        return Promise.resolve(response);
      })
      .mockImplementation((url) => {
        let path = "";

        if (url instanceof URL) {
          path = url.href;
        } else if (url instanceof Request) {
          path = url.url;
        } else if (typeof url === "string") {
          path = url;
        }

        let blob = new Blob();

        if (path.startsWith(`${api}/films/1`)) {
          blob = new Blob([JSON.stringify(movies[0], null, 2)], {
            type: "application/json",
          });
        }

        if (path.startsWith(`${api}/films/2`)) {
          blob = new Blob([JSON.stringify(movies[1], null, 2)], {
            type: "application/json",
          });
        }

        if (path.startsWith(`${api}/films/3`)) {
          blob = new Blob([JSON.stringify(movies[2], null, 2)], {
            type: "application/json",
          });
        }

        if (path.startsWith(`${api}/films/6`)) {
          blob = new Blob([JSON.stringify(movies[3], null, 2)], {
            type: "application/json",
          });
        }

        const response = new Response(blob, {
          status: 404,
          statusText: "Not Found",
        });

        return Promise.resolve(response);
      });

    await expect(fetchCharacterWithMovies(characterId)).rejects.toThrow(
      "smth went wrong"
    );
  });

  test("fail films result: rejects promise", async () => {
    const characterId = 4;

    vi.spyOn(global, "fetch")
      .mockImplementationOnce(() => {
        const blob = new Blob([JSON.stringify(character, null, 2)], {
          type: "application/json",
        });

        const response = new Response(blob, {
          status: 200,
          statusText: "OK",
        });

        return Promise.resolve(response);
      })
      .mockImplementation(() => Promise.reject(new Error("error")));

    await expect(fetchCharacterWithMovies(characterId)).rejects.toThrow(
      "smth went wrong"
    );
  });

  test("fail people result: 404", async () => {
    const characterId = 4;

    vi.spyOn(global, "fetch").mockImplementation(() => {
      const blob = new Blob([JSON.stringify(character, null, 2)], {
        type: "application/json",
      });

      const response = new Response(blob, {
        status: 404,
        statusText: "Not Found",
      });

      return Promise.resolve(response);
    });

    await expect(fetchCharacterWithMovies(characterId)).rejects.toThrow(
      "smth went wrong"
    );
  });

  test("fail people result: rejects promise", async () => {
    const characterId = 4;

    vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.reject(new Error("error"))
    );

    await expect(fetchCharacterWithMovies(characterId)).rejects.toThrow(
      "smth went wrong"
    );
  });
});
