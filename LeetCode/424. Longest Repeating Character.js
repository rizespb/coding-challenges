// https://leetcode.com/problems/longest-repeating-character-replacement/description/

const { test } = require('../test');

const characterReplacement = (str, k) => {
  const map = {};

  let left = 0;
  let right = 0;

  let windowMaxFreq = 0;

  let maxSubstringLength = 0;

  while (right < str.length) {
    map[str[right]] = (map[str[right]] ?? 0) + 1;

    windowMaxFreq = Math.max(windowMaxFreq, map[str[right]]);

    if (right - left + 1 - windowMaxFreq > k) {
      map[str[left]]--;
      left++;
    }

    maxSubstringLength = Math.max(maxSubstringLength, right - left + 1);

    right++;
  }

  return maxSubstringLength;
};

test(characterReplacement, [
  {
    input: ['ABAB', 2],
    expected: 4,
  },
  {
    input: ['AABABBA', 1],
    expected: 4,
  },
  {
    input: ['AABAABBBBBB', 2],
    expected: 9,
  },
  {
    input: ['ABBB', 2],
    expected: 4,
  },
]);
