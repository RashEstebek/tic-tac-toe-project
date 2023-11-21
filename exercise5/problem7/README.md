# Problem 7

Make request from [PokeAPI](https://pokeapi.co/docs/v2). Write a function that receives an array of pokemons name and
returns an array of objects with pokemon:

```ts
const result = [
    {
        id: 35,
        name: "clefairy",
        height: 6,
        weight: 75,
        // use from pokemon.sprites.front_default
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
    },
    {
        id: 2,
        name: "ivysaur",
        height: 10,
        weight: 130,
        // use from pokemon.sprites.front_default
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
    },
]
```

**Note1**: use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

**Note2**: don't forget about handling errors. Even if response was invalid (400's, 500's responses). For it just return

```ts
return Promise.reject(new Error("smth went wrong"));
```

```ts
fetchPokemon(["clefairy", "ivysaur"])
// [
//     {
//         id: 35,
//         name: "clefairy",
//         height: 6,
//         weight: 75,
//         // use from pokemon.sprites.front_default
//         image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
//     },
//     {
//         id: 2,
//         name: "ivysaur",
//         height: 10,
//         weight: 130,
//         // use from pokemon.sprites.front_default
//         image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
//     },
// ]

fetchPokemon(["not exist1", "not exist2"])
// Error: smth went wrong
```

