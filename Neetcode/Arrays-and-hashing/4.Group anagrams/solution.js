/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams1 = function (strs) {
  // my approach
  let sortedWords = {};
  for (let i = 0; i < strs.length; i++) {
    let sortedWord = strs[i]
      .split("")
      .sort((a, b) => a.charCodeAt() - b.charCodeAt())
      .join("");
    if (sortedWords[sortedWord] == undefined) {
      sortedWords[sortedWord] = [strs[i]];
      continue;
    }
    sortedWords[sortedWord].push(strs[i]);
  }
  let ans = [];
  for (const sortedWord in sortedWords) {
    ans.push(sortedWords[sortedWord]);
  }
  return ans;
  // TC: n* klogk
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams2 = function (strs) {
  // Improved approach
  let sortedWords = new Map();
  for (let i = 0; i < strs.length; i++) {
    let sortedWord = strs[i]
      .split("")
      .sort((a, b) => a.charCodeAt() - b.charCodeAt())
      .join("");
    if (sortedWords.has(sortedWord)) {
      sortedWords.get(sortedWord).push(strs[i]);
      continue;
    }
    sortedWords.set(sortedWord, [strs[i]]);
  }

  return Array.from(sortedWords.values());
  // TC: n* klogk
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let sortedWords = new Map();
  for (const word of strs) {
    let canonicalHash = Array(26).fill(0);
    for (const ch of word) {
      canonicalHash[ch.charCodeAt(0) - 97]++;
    }
    let key = canonicalHash.join("#"); // very important, will cause collision if joined(""), see info in md
    if (sortedWords.has(key)) {
      sortedWords.get(key).push(word);
    } else {
      sortedWords.set(key, [word]);
    }
  }
  return Array.from(sortedWords.values());
  // TC: n*k
};
