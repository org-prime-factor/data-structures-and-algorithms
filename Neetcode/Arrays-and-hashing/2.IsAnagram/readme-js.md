# Valid Anagram (LeetCode 242) – JavaScript

## Problem link
https://leetcode.com/problems/valid-anagram/

---

## What I learned

### What an anagram is
An anagram is formed by rearranging the letters of one word to create another. The key constraints are:
- Use every letter from the source word exactly once
- No extra letters allowed
- No letters can be left unused
- It doesn't even need to be a real word

Example: "listen" and "silent" are anagrams.

---

### My approach: frequency counting
The problem boils down to checking if both strings have the same letters with the same frequencies.

**V1**: Build a frequency map for each string, compare their sizes, then compare each key's value.

**V2**: Build a frequency map for the first string, then decrement counts while iterating through the second string.

---

### The `(freq[ch] || 0) + 1` pattern
Instead of checking if a key exists before incrementing, I can write:

```js
freq[ch] = (freq[ch] || 0) + 1;
```

This is cleaner than using `hasOwnProperty` because:
- If `freq[ch]` exists, use its value
- If `freq[ch]` is `undefined`, the `|| 0` gives us `0`
- Then add `1`

I was initially trying `freq[ch]++` like in C++, but that doesn't work in JS because the key might not exist yet. In C++, maps default uninitialized values to `0`, but JS doesn't.

---

### Three ways to check if a key exists in an object

**Method 1: Direct property access**
```js
if (freq[ch]) { /* ... */ }
```
Works great for frequency counting because both `undefined` and `0` are falsy.

**Method 2: hasOwnProperty**
```js
if (freq.hasOwnProperty(ch)) { /* ... */ }
```
Safe and explicit. Doesn't check the prototype chain.

**Method 3: in operator**
```js
if (ch in freq) { /* ... */ }
```
The issue here is it checks all the way down the prototype chain, which can give unexpected results.

---

### The clever decrement logic in V2
In the second loop when processing string `t`:

```js
if (!freq[ch]) return false;
freq[ch]--;
```

This is beautiful because it handles multiple cases:
- **Key doesn't exist**: `freq[ch]` is `undefined` → `!undefined` is `true` → return `false`
- **Count already at 0**: `!0` is `true` → return `false` (meaning `t` has more of this character than `s`)
- **Otherwise**: decrement the count

The sexiest part: if we have 4 A's in `s` and we decrement through them while processing `t`, once we hit `0` and still see another A in `t`, the condition catches it automatically. It's a letter count mismatch without needing extra checks.

---

## Optimal solution
Version used: V2

Why it is optimal:
* Only one frequency map instead of two
* Early exit with length check
* Leverages JS falsy values (`0` and `undefined`)
* Cleaner logic: increment then decrement

Complexity:
* Time: `O(n)` where n is the length of the strings
* Space: `O(k)` where k is the number of unique characters (at most 26 for lowercase English letters)

---

## Notes
V1 builds two maps and compares them, so space complexity scales with both inputs.

V2 uses a single map and the decrement strategy, making it more space-efficient. The time complexity is essentially the same, but V2 has better constant factors.

---

## Links to other material
* Logical OR operator (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR
* hasOwnProperty (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
* in operator (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in