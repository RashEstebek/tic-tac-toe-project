# Problem 10

Create a function that takes an array of objects of structure:

```ts
type InputItem = {
    name: string;
    notes: number[];
};

type Input = InputItem[];
```

and returns:

```ts
type ReturnItem = {
    name: string;
    topNote: number;
};

type Return = ReturnItem[];
```

If student has no notes (an empty array) then let's assume `topNote: 0`.

```js
console.log(
	getStudentsWithNamesAndTopNotes([
		{name: "John", notes: [3, 5, 4]},
		{name: "Max", notes: [1, 4, 6]},
		{name: "Zygmund", notes: [1, 2, 3]},
	])
)
// [
//   ({ name: "John", topNote: 5 },
//   { name: "Max", topNote: 6 },
//   { name: "Zygmund", topNote: 3 })
// ];
```