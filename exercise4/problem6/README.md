# Problem 6

Take `BankAccount` from previous problem. And create 2 new: `FedexAccount` and `KazPostAccount`

1. `FedexAccount`: has 2 public methods `sendMail(recipient)` and `recieveMail(sender)`. Just use `console.log` with any
   random text within the body.
2. `KazPostAccount`: has all public methods of `BankAccount` and `FedexAccount`.

Task:

* function `withdrawMoney` should only accept `BankAccount` and `KazPostAccount` instances. **HINT** only forbidden by
  typescript
* function `sendLetterTo` should only accept `FedexAccount` and `KazPostAccount` instances. **HINT** only forbidden by
  typescript

```ts
const normanOsborne = new BankAccount();
const peterParker = new FedexAccount();
const auntMay = new KazPostAccount();

withdrawMoney([normanOsborne, auntMay], 10); // no error
sendLetterTo([peterParker, auntMay], "Mary Jane"); // no error

withdrawMoney([peterParker, auntMay], 10); // peterParker error
```

**NOTE**: no tests because it is more about types and structure than implementation. But please do not ignore this task.