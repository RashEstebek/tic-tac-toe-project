# Problem 1

Create a function which receives a function as argument and executes it after **2 seconds**

```ts
function displayHello() {
    console.log('Hello');
}

callbackExec(displayHello); // calls after 2 sec
```