// https://leetcode.com/problems/valid-anagram/description/
const { test } = require('../test');

const isAnagram = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  const map = {};

  for (const char of str1) {
    map[char] = (map[char] ?? 0) + 1;
  }

  for (const char of str2) {
    if (!(char in map) || --map[char] < 0) return false;
  }

  return true;
};

test(isAnagram, [
  {
    input: ['anagram', 'nagaram'],
    expected: true,
  },
  {
    input: ['rat', 'car'],
    expected: false,
  },
]);
