# Problem 2

Write a class called `Name` and create the following attributes given a first name and last name (as `firstName`
and `lastName`):

* An attribute called `fullName` which returns the first and last names.
* An attribute called `initials` which returns the first letters of the first and last name. Put a `.` between the two
  letters.

Remember to allow the attributes `firstName` and `lastName` to be accessed individually as well.

```ts
const p1 = new Name("john", "SMITH")

p1.firstName // "John"
p1.lastName // "Smith"
p1.fullName // "John Smith"
p1.initials // "J.S"
```