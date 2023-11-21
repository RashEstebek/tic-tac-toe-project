# Problem 8

Create a function that takes three values:

* `h` hours - as `1` arg
* `m` minutes - as `2` arg
* `s` seconds - as `3` arg

Return the value that's the __longest duration__. If equal take the last argument.

```js
console.log(longestTime(1, 59, 3598)) // 1

console.log(longestTime(2, 300, 15000)) // 300

console.log(longestTime(15, 955, 59400)) // 59400
```