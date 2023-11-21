# Problem 7

Create a function to check whether the given parameter is a primitive or not.

```js
console.log(isPrimitive(function add(x, y) {
	return x + y
})) // true

console.log(isPrimitive(new RegExp('^[a-zA-Z0-9]+$', 'g'))) // true

console.log(isPrimitive(null)) // false

console.log(isPrimitive("")) // false
```