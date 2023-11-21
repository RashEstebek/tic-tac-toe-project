# Problem 8

Create a function that checks to see if two object arguments are equal to one another. Return `true` if the objects are
equal, otherwise, return `false`.

```js
console.log(
	isEqual(
		{
			name: "Benny",
			phone: "3325558745",
			email: "benny@edabit.com",
		},
		{
			name: "Jason",
			phone: "9853759720",
			email: "jason@edabit.com",
		}
	)
); // false

console.log(
	isEqual(
		{
			name: "Jason",
			phone: "9853759720",
			email: "jason@edabit.com",
		},
		{
			name: "Jason",
			phone: "9853759720",
			email: "jason@edabit.com",
		}
	)
); // true
```