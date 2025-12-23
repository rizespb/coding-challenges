// https://leetcode.com/problems/group-anagrams/description/

// Given an array of strings strs, group the
// anagrams
//  together. You can return the answer in any order.

const groupAnagrams = (strs) => {
  const map = {};

  for (let i = 0; i < strs.length; i++) {
    const word = strs[i];

    const sorted = word.split('').sort().join('');

    if (!map[sorted]) {
      map[sorted] = [];
    }

    map[sorted].push(word);
  }

  return Object.values(map);
};
