import { describe, expect, test } from "vitest";
import BankAccount from "./index";

describe("exercise4 - problem5", () => {
  test("should deposit to balance", () => {
    const account = new BankAccount();

    account.deposit(300);

    expect(account.deposit(3000)).toBe(3300);
  });

  test("should withdraw balance", () => {
    const account = new BankAccount();

    account.deposit(200);

    expect(account.withdraw(100)).toBe(100);
  });

  test("should deposit and withdraw several times", () => {
    const account = new BankAccount();

    account.deposit(200);
    account.withdraw(100);
    account.withdraw(50);
    account.deposit(100);

    expect(account.withdraw(50)).toBe(200 - 100 - 50 + 100 - 50);
  });

  test("should deposit only if not greater than 1 000 000", () => {
    const account = new BankAccount();

    expect(account.deposit(1_000_000)).toBe(1_000_000);
    expect(account.deposit(1_000_001)).toBe(-1);
    expect(account.deposit(2_000_000)).toBe(-1);
    expect(account.withdraw(100_000)).toBe(900_000);
  });

  test("should withdraw only if has sufficient funds", () => {
    const account = new BankAccount();

    account.deposit(1_000_000);

    expect(account.withdraw(1_000_000)).toBe(0);
    expect(account.withdraw(1_000_000)).toBe(-1);
    expect(account.withdraw(1)).toBe(-1);
    expect(account.deposit(1)).toBe(1);
  });

  test("should only have 2 public methods: withdraw, deposit; 0 public properties", () => {
    const account = new BankAccount();

    expect(Object.getOwnPropertyNames(Object.getPrototypeOf(account))).toEqual([
      "constructor",
      "withdraw",
      "deposit",
    ]);
    expect(Object.getOwnPropertyNames(account)).toEqual([]);
  });
});
