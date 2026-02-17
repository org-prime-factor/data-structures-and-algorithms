# Two Sum (LeetCode 1) – JavaScript

## Problem link

https://leetcode.com/problems/two-sum/

---

## What I learned

### What the problem is really asking

We are given:

- An array of integers
- A target value

We must return the **indices** of two numbers such that:

nums[i] + nums[j] = target

Constraints:

- Exactly one solution exists
- Cannot use the same element twice
- Return original indices (not sorted positions)

---

### My initial approaches

#### V1: Brute force

Take each element and check it with every other element.

Two nested loops:

- Outer loop picks first number
- Inner loop checks remaining numbers

Time complexity:
O(n²)

This works but is not optimal.

---

#### V2: Sorting + two pointers

I thought of sorting the array and using two pointers.

Problem:

- Sorting changes the original indices.
- The problem expects original index positions.

Even though sorting is O(n log n), we would need extra work to track indices.

So this approach complicates things unnecessarily.

---

#### V3: Using a Set (my first optimization attempt)

Idea:

x + y = target  
y = target - x

So:

- Store all numbers in a Set
- For each number, compute complement
- If complement exists → solution found
- Then iterate again to find index of complement

Issue:
Even though Set lookup is O(1), I added another loop to find index.

So:
Outer loop → O(n)  
Inner loop → O(n)

Worst case → O(n²)

So this still behaves like brute force.

---

### The optimal approach: Hash Map

Key insight:

Instead of storing just numbers, store:

number → index

Then while iterating:

- Compute complement
- Check if complement already exists in map
- If yes → return stored index and current index
- If not → store current number

---

### Final Solution

- **THIS IS FUCKING GENIUS**

```js
var twoSum = function (nums, target) {
  const map = new Map(); // number -> index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }
};
```

---

## Why checking before inserting matters

Example:

nums = [5, 5]  
target = 10

At index 0:

- complement = 5
- map is empty
- store 5 → 0

At index 1:

- complement = 5
- map has 5
- return [0, 1]

If we inserted before checking, we could accidentally use the same index twice.

---

## Complexity

Time:  
O(n)

Space:  
O(n)

---

## Key Pattern I Learned

Whenever I see:

a + b = target

I should immediately think:

b = target - a  
Use a hash map  
Solve in one pass
