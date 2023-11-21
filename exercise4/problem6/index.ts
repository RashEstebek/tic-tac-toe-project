// Update it as much as you want, just don't change the names

export class BankAccount {}

export class FedexAccount {}

export class KazPostAccount {}

export function withdrawMoney(accounts, amount) {
  for (const account of accounts) {
    account.withdraw(amount);
  }
}

export function sendLetterTo(accounts, recipient) {
  for (const account of accounts) {
    account.sendMail(recipient);
  }
}
