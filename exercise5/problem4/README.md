# Problem 4

create `Timer` class in order to use as timer interface.

```ts
const timer = new Timer();

timer.start(); // should start timer counter
timer.pause(); // should pause timer counter
timer.reset(); // should reset timer
timer.log(); // should show timer state, format: { h: number, m: number, s: number, ms: number }

// use this as a test
timer.start();
setTimeout(() => {
    time.log(); // should log -> { h: 0, m: 0, s: 1, ms: 234 }
    time.pause();
    time.log(); // should log -> { h: 0, m: 0, s: 1, ms: 234 }
    time.start();

    setTimeout(() => {
        time.log(); // should log -> { h: 0, m: 0, s: 3, ms: 221 }
        time.reset();

        setTimeout(() => {
            time.log(); // should log -> { h: 0, m: 0, s: 1, ms: 0 }
        }, 1000)
    }, 1987);
}, 1234);
```

**HINT**: don't use `performance.now()`, `setTimeout` or `setInterval`, try `Date`