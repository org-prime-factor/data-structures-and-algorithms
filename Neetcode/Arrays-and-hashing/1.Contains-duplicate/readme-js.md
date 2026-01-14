# Contains Duplicate (LeetCode 217) – JavaScript

## Problem link

https://leetcode.com/problems/contains-duplicate/

---

## What I learned

### Set is the right tool here

I need to answer one question: have I seen this number before?

A `Set` in JS stores unique values and gives me two operations that fit perfectly:

- `has(value)` to check if the value already exists
- `add(value)` to store the value

So I can walk through the array once, and the moment I see a number that is already in the set, I return `true`.

---

### Why `new Set()` is used

`Set` is a built-in class in JS. To create an actual set object, I have to create an instance of it, and that is what `new` does.

When I write:

```js
const seen = new Set();
```

JS does the following:

1. Creates a new object
2. Runs the `Set` constructor to initialize its internal storage
3. Assigns the result to `seen`

If I try `Set()` without `new`, JS throws an error because class constructors must be called with `new`.

---

### What a constructor is

A constructor is a special method that runs automatically when an object is created from a class. Its job is to set up the initial state.

Example:

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
const u = new User("Alex");
```

What happens:

- `new User("Alex")` creates a new object
- `constructor(name)` runs automatically
- `this` refers to the new object
- `this.name = "Alex"` sets the property

The same applies to `new Set()`. The constructor sets up the internal structure that makes `has()` and `add()` work.

---

## JS methods used

### `new Set()`

Creates a new Set instance and initializes its internal storage.

### `set.has(value)`

Checks whether `value` exists in the set.

---

## Notes

`Set` uses SameValueZero comparison:

- `NaN` is treated as equal to `NaN`
- `+0` and `-0` are treated the same

---

## Links to other material

- Set (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
- Constructor (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
