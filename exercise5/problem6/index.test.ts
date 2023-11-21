import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import fetchPokemon from "./index";

const pokemon = {
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
};

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

describe("exercise5 - problem6", () => {
  test("fetch correct result", async () => {
    const expected = {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      image: pokemon.sprites.front_default,
    };

    const fetchMock = vi.spyOn(global, "fetch").mockImplementationOnce(() => {
      const blob = new Blob([JSON.stringify(pokemon, null, 2)], {
        type: "application/json",
      });

      const response = new Response(blob, {
        status: 200,
        statusText: "OK",
      });

      return Promise.resolve(response);
    });

    await expect(fetchPokemon(pokemon.name)).resolves.toEqual(expected);
    expect(fetchMock).toHaveBeenLastCalledWith(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );
  });

  test("fail pokemon result: 404", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() => {
      const blob = new Blob([JSON.stringify(pokemon, null, 2)], {
        type: "application/json",
      });

      const response = new Response(blob, {
        status: 404,
        statusText: "Not Found",
      });

      return Promise.resolve(response);
    });

    await expect(fetchPokemon(pokemon.name)).rejects.toThrow("smth went wrong");
  });

  test("fail pokemon result: rejects promise", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.reject(new Error("error"))
    );

    await expect(fetchPokemon(pokemon.name)).rejects.toThrow("smth went wrong");
  });
});
