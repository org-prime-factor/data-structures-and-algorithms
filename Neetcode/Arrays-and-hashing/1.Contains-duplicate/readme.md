# Contains Duplicate (LeetCode 217)

## Problem link

https://leetcode.com/problems/contains-duplicate/

---

## What did I learn

- `set` in C++ is typically a self balancing BST (Red Black Tree), keeps elements ordered, and lookup or insert is `O(log n)`.
- `unordered_set` is a hash table, does not keep ordering, and lookup or insert is `O(1)` average.
- Since this problem does not need ordering, `unordered_set` is a better fit.
- Using `reserve(nums.size())` reduces rehash operations and improves constant factors for large inputs.

---

## Optimal solution

**Version used:** `containsDuplicateV3`  
Reason: `unordered_set` gives `O(1)` average lookup and `reserve()` avoids repeated rehashing when inserting up to `nums.size()` elements.

---

## C++ functions used (quick reference)

### `unordered_set::contains(key)`

- Purpose: Check if an element exists.
- Returns: `true` if present, else `false`.
- Complexity: `O(1)` average, `O(n)` worst case.

### `unordered_set::insert(value)`

- Purpose: Insert an element.
- Returns: `pair<iterator, bool>`
  - `.second == true` means insertion happened (value was not already present)
  - `.second == false` means value already existed
- Complexity: `O(1)` average, `O(n)` worst case.

### `unordered_set::reserve(n)`

- Purpose: Pre allocate buckets to support about `n` elements without frequent rehashing.
- Benefit: Reduces expensive rehash operations (constant factor improvement).
- Complexity: `O(n)` in the moment it reallocates or rehashes, but usually worth it when you know the final size.

### `unordered_set::rehash(bucket_count)` (extra)

- Purpose: Force number of buckets (and rehash all elements).
- Usually not needed if `reserve()` is used.

---

## Links to other material

- `set`: https://en.cppreference.com/w/cpp/container/set
- `unordered_set`: https://en.cppreference.com/w/cpp/container/unordered_set
- `reserve()`: https://en.cppreference.com/w/cpp/container/unordered_set/reserve
- `insert()`: https://en.cppreference.com/w/cpp/container/unordered_set/insert
- `contains()`: https://en.cppreference.com/w/cpp/container/unordered_set/contains
