import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import fetchPokemons from "./index";

const pokemons = [
  {
    id: 35,
    name: "clefairy",
    base_experience: 113,
    height: 6,
    is_default: true,
    order: 56,
    weight: 75,
    location_area_encounters: "/api/v2/pokemon/35/encounters",
    sprites: {
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png",
      back_female: null,
      back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/35.png",
      back_shiny_female: null,
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
      front_female: null,
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png",
      front_shiny_female: null,
    },
    stats: [
      {
        base_stat: 35,
        effort: 0,
        stat: {
          name: "speed",
          url: "https://pokeapi.co/api/v2/stat/6/",
        },
      },
    ],
    types: [
      {
        slot: 1,
        type: {
          name: "fairy",
          url: "https://pokeapi.co/api/v2/type/18/",
        },
      },
    ],
  },
  {
    height: 10,
    id: 2,
    is_default: true,
    name: "ivysaur",
    order: 2,
    sprites: {
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png",
      back_female: null,
      back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/2.png",
      back_shiny_female: null,
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      front_female: null,
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png",
      front_shiny_female: null,
    },
    stats: [
      {
        base_stat: 60,
        effort: 0,
        stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
      },
      {
        base_stat: 62,
        effort: 0,
        stat: { name: "attack", url: "https://pokeapi.co/api/v2/stat/2/" },
      },
      {
        base_stat: 63,
        effort: 0,
        stat: { name: "defense", url: "https://pokeapi.co/api/v2/stat/3/" },
      },
      {
        base_stat: 80,
        effort: 1,
        stat: {
          name: "special-attack",
          url: "https://pokeapi.co/api/v2/stat/4/",
        },
      },
      {
        base_stat: 80,
        effort: 1,
        stat: {
          name: "special-defense",
          url: "https://pokeapi.co/api/v2/stat/5/",
        },
      },
      {
        base_stat: 60,
        effort: 0,
        stat: { name: "speed", url: "https://pokeapi.co/api/v2/stat/6/" },
      },
    ],
    types: [
      {
        slot: 1,
        type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      },
      {
        slot: 2,
        type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
      },
    ],
    weight: 130,
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
    const expected = pokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      image: pokemon.sprites.front_default,
    }));

    vi.spyOn(global, "fetch").mockImplementationOnce(async (url) => {
      let path = "";

      if (url instanceof URL) {
        path = url.href;
      } else if (url instanceof Request) {
        path = url.url;
      } else if (typeof url === "string") {
        path = url;
      }

      let blob = new Blob();

      if (path.includes(pokemons[0].name)) {
        blob = new Blob([JSON.stringify(pokemons[0], null, 2)], {
          type: "application/json",
        });
      }

      if (path.includes(pokemons[1].name)) {
        blob = new Blob([JSON.stringify(pokemons[1], null, 2)], {
          type: "application/json",
        });
      }

      const response = new Response(blob, {
        status: 200,
        statusText: "OK",
      });

      return Promise.resolve(response);
    });

    await expect(
      fetchPokemons(pokemons.map(({ name }) => name))
    ).resolves.toEqual(expected);
  });

  test("fetch in parallel", async () => {
    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(async () => {
      const blob = new Blob([JSON.stringify(pokemons, null, 2)], {
        type: "application/json",
      });

      const response = new Response(blob, {
        status: 200,
        statusText: "OK",
      });

      await wait(2000);

      return Promise.resolve(response);
    });

    expect(fetchMock).toBeCalledTimes(0);
    fetchPokemons(pokemons.map(({ name }) => name));
    expect(fetchMock).toBeCalledTimes(pokemons.length);
    vi.runAllTimers();
    expect(fetchMock).toBeCalledTimes(pokemons.length);
  });

  test("fail pokemons result: 404", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() => {
      const blob = new Blob([JSON.stringify(pokemons, null, 2)], {
        type: "application/json",
      });

      const response = new Response(blob, {
        status: 404,
        statusText: "Not Found",
      });

      return Promise.resolve(response);
    });

    await expect(
      fetchPokemons(pokemons.map(({ name }) => name))
    ).rejects.toThrow("smth went wrong");
  });

  test("fail pokemons result: rejects promise", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.reject(new Error("error"))
    );

    await expect(
      fetchPokemons(pokemons.map(({ name }) => name))
    ).rejects.toThrow("smth went wrong");
  });
});
