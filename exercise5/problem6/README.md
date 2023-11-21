# Problem 6

Make request from [PokeAPI](https://pokeapi.co/docs/v2). Write a function that receives a pokemon name and returns
object with pokemon:

```ts
const return = {
    id: 35,
    name: "clefairy",
    height: 6,
    weight: 75,
    // use from pokemon.sprites.front_default
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
}
```

**Note1**: use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

**Note2**: don't forget about handling errors. Even if response was invalid (400's, 500's responses). For it just return

```ts
return Promise.reject(new Error("smth went wrong"));
```

```ts
fetchPokemon("clefairy");
// {
//   id: 35,
//     name: "clefairy",
//   height: 6,
//   weight: 75,
//   // use from pokemon.sprites.front_default
//   image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
// }

fetchPokemon("no exist");
// Error: smth went wrong
```

