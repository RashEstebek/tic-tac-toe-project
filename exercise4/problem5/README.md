# Problem 5

**Encapsulation**

Complete `class`: `BankAccount`. With only 2 public methods, no public properties:

1. `withdraw`: Withdraws money from balance. But only if amount does exceed balance. Return balance in success,
   otherwise  `-1`
2. `deposit`: Deposits money to balance. But only if amount does exceed `1_000_000`. Return balance in success,
   otherwise  `-1`

_Do it in OOP way_.

```ts
const account = new BankAccount();

console.log(account.withdraw(100)) // -1
console.log(account.deposit(100)) // 100
console.log(account.withdraw(10)) // 90
console.log(account.deposit(10_000_000)) // -1
console.log(account.withdraw(10)) // 80
```