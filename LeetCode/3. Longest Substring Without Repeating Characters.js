// https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

const { test } = require('../../test');

const lengthOfLongestSubstring = (str) => {
  const map = {};

  let counter = 0;

  let left = -1;
  let right = -1;

  maxLength = 0;

  while (right < str.length - 1) {
    right++;
    counter++;

    const current = str[right];

    map[current] = (map[current] || 0) + 1;

    if (map[current] === 1) {
      maxLength = Math.max(maxLength, counter);

      continue;
    }

    while (map[current] > 1) {
      left++;
      map[str[left]]--;
      counter--;
    }
  }

  return maxLength;
};

test(lengthOfLongestSubstring, [
  {
    input: ['abcabcbb'],
    expected: 3,
  },
  {
    input: ['bbbbb'],
    expected: 1,
  },
  {
    input: ['pwwkew'],
    expected: 3,
  },
]);
