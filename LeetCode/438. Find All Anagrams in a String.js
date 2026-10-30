// https://leetcode.com/problems/find-all-anagrams-in-a-string/description/
const { test } = require('../test');

const findAnagrams = (str, word) => {
  const map = {};

  const total = word.length;

  for (const char of word) {
    map[char] = (map[char] ?? 0) + 1;
  }

  const result = [];

  let left = 0;
  let right = 0;

  let currentAmount = 0;

  while (right < str.length) {
    const current = str[right];

    if (map[current]) {
      map[current]--;
      currentAmount++;

      if (currentAmount === total) {
        result.push(left);

        map[str[left]]++;
        left++;
        currentAmount--;
      }

      right++;

      continue;
    }

    if (map[current] === 0) {
      map[str[left]]++;
      left++;
      currentAmount--;

      continue;
    }

    right++;

    while (left < right) {
      if (str[left] in map) {
        map[str[left]]++;
        currentAmount--;
      }

      left++;
    }
  }

  return result;
};

test(findAnagrams, [
  {
    input: ['cbaebabacd', 'abc'],
    expected: [0, 6].toString(),
  },
  {
    input: ['abab', 'ab'],
    expected: [0, 1, 2].toString(),
  },
  {
    input: ['baa', 'aa'],
    expected: [1].toString(),
  },
]);
