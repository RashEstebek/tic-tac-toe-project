# Problem 7

Given an object of _people_ and their _ages_, return how old the people would be after `n` years have passed. Use the
**absolute value** of `n`.

```js
console.log(
	afterNYears(
		{
			Joel: 32,
			Fred: 44,
			Reginald: 65,
			Susan: 33,
			Julian: 13,
		},
		1
	)
);
// {
//   Joel: 33,
//   Fred: 45,
//   Reginald: 66,
//   Susan: 34,
//   Julian: 14,
// };

console.log(
	afterNYears(
		{
			Baby: 2,
			Child: 8,
			Teenager: 15,
			Adult: 25,
			Elderly: 71,
		},
		19
	)
);
// {
//   Baby: 21,
//   Child: 27,
//   Teenager: 34,
//   Adult: 44,
//   Elderly: 90,
// };

console.log(
	afterNYears(
		{
			Genie: 1000,
			Joe: 40,
		},
		5
	)
);
// {
//   Genie: 1005,
//   Joe: 45,
// };
```