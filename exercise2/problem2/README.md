# Problem 2

Create a function that, given an array where elements of the array are either an _integer or an array containing a
single integer_, sorts the array according to the "content of the elements".

```js
console.log(sortIt([4, 1, 3])) // [1, 3, 4]

console.log(sortIt([[4], [1], [3]])) // [[1], [3], [4]]

console.log(sortIt([4, [1], 3])) // [[1], 3, 4]

console.log(sortIt([[4], 1, [3]])) // [1, [3], [4]]

console.log(sortIt([[3], 4, [2], [5], 1, 6])) // [1, [2], [3], 4, [5], 6]
```