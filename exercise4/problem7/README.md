# Problem 7

Create `is` which will check values validity.

* `is.bool` - checks if value is `boolean`
* `is.num`: checks if value is `number`
* `is.str` - checks if value is `string`
* `is.fun` - checks if value is `function`

```ts
is.bool(true) // true
is.fun(() => {
}); //true
is.fun({}); //false

is.num(NaN); //true
```
