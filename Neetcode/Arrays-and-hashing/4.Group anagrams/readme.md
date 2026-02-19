# Group Anagrams (LeetCode 49) – Notes for Future Me

## Problem link

https://leetcode.com/problems/group-anagrams/

---

## What I Should Recognize Immediately

If the question says:

- "Group words"
- "Same letters"
- "Rearranged"
- "Anagram"

This is a **Canonical Form + Hashing** problem.

We must:

Convert each word → canonical representation → group using a hash map.

---

## Canonical Form (Core Idea)

Canonical form = a **standard identity** for things that are logically the same.

Example:

tan
nat
ant

Different strings, but logically identical.

We convert them into:

ant ← canonical form

Now grouping becomes trivial.

---

## How We Create Canonical Form

### Method 1 — Sorting (Most Common)

word.split("").sort().join("")

Example:

tea → aet
eat → aet

Same canonical form ⇒ same group.

---

### Method 2 — Frequency Signature (Faster)

Count letters using a fixed array:

[a,b,c,...,z] frequency array

This uniquely represents the structure of the word.

---

## Why My First Idea Was Wrong

I tried using character sums.

That fails because:

Different structures can give the same numeric value.

Canonical form must preserve **structure**, not just value.

---

## Why We Use a Map (NOT `{}` Object)

Both store key → value pairs, but Map is designed for **algorithmic hashing**.

### Problems With `{}`

1️⃣ Keys are forced into strings

obj[[1,0,1]] → becomes "1,0,1"

This implicit conversion can create bugs.

2️⃣ Objects inherit prototype keys

toString
constructor
hasOwnProperty

These can interfere unless you do:

Object.create(null)

(which is ugly and easy to forget).

3️⃣ Objects were not designed for heavy dynamic insert/lookups.

Map is implemented internally as a **true hash table**.

---

## Why Map Is Perfect Here

We need:

- Dynamic keys
- Frequent inserts
- Frequent lookups
- Guaranteed behavior

Conceptually:

Map = algorithm data structure
Object = JSON-style container

---

## JS Map Methods Used

### map.set(key, value)

Create a new anagram group.

### map.has(key)

Check existence in O(1).

### map.get(key)

Retrieve the group and push.

### map.values()

Returns only grouped arrays (ignores keys).

We convert iterator → array:

Array.from(map.values())

---

## Final Code (Sorting Canonical Form)

```js
var groupAnagrams = function (strs) {
  const map = new Map();

  for (const word of strs) {
    const canonical = word.split("").sort().join("");

    if (!map.has(canonical)) map.set(canonical, []);
    map.get(canonical).push(word);
  }

  return Array.from(map.values());
};
```

---

## Complexity (Sorting Approach)

n = number of words
k = word length

Time:

O(n \* k log k)

Space:

O(n \* k)

---

# Optimization: Frequency-Based Canonical Form

## Key Observation

Anagrams are defined by **character frequency, not order**.

eat → e:1, a:1, t:1
tea → e:1, a:1, t:1
ate → e:1, a:1, t:1

So instead of sorting, we build a frequency signature.

---

## The Real Insight

Every lowercase word can be represented using a **fixed array of size 26**.

Example: "bat"

b → index 1 → +1
a → index 0 → +1
t → index 19 → +1

Result:

[1,1,0,0,0,0,...,1,...]

This array uniquely identifies the anagram group.

---

## Why This Is Faster

Building the frequency array is:

O(k)

No sorting → no log k factor.

Total:

O(n \* k) ← optimal

---

## Implementation Strategy

We cannot use arrays directly as Map keys,
so we serialize the array into a string key.

---

## ⚠️ VERY IMPORTANT: Why We Use `join("#")` and NOT `join("")`

If we do:

count.join("")

we smash numbers together **without boundaries**.

This creates collisions.

Example:

[1,11,0] → "1110"
[11,1,0] → "1110"

Different arrays → SAME string → WRONG grouping.

Real bug example:

"bdddddddddd" → b:1, d:10
"bbbbbbbbbbc" → b:10, c:1

Arrays:

[0,1,0,10,...]
[0,10,1,0,...]

Using join("") both become:

"01010..."

Collision.

---

## Why `join("#")` Fixes It

Using a delimiter preserves structure:

0#1#0#10#...
0#10#1#0#...

Now they are distinguishable.

### Rule to Remember

Whenever serializing structured numeric data:

ALWAYS include a separator.

This applies to:

- Hash keys
- Memoization
- Graph encoding
- DP state compression

---

## Final Optimized Solution (Frequency Canonical Form)

```js
var groupAnagrams = function (strs) {
  const map = new Map();

  for (const str of strs) {
    const count = new Array(26).fill(0);

    for (const ch of str) {
      count[ch.charCodeAt(0) - 97]++;
    }

    const key = count.join("#");

    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }

  return Array.from(map.values());
};
```

---

## Complexity (Frequency Approach)

Time:

O(n \* k)

Space:

O(n \* k)

---

## When To Use Which Approach

Sorting → easier, acceptable in interviews
Frequency → when optimizing or input is large

---

## Pattern This Problem Teaches

Normalize → Hash → Group

---

## Mental Checklist for Similar Problems

Ask:

Can I convert each input into a canonical identity?

If yes:

Use Map<canonical, group>

Never brute-force compare strings.

---

## One-Line Memory Hook

When order doesn’t matter, hash the structure.
