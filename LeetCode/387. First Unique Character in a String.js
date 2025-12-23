// https://leetcode.com/problems/first-unique-character-in-a-string/description/

const { test } = require('../test');

const firstUniqChar = (str) => {
  const unique = new Set();
  const repeated = new Set();

  for (let i = 0; i < str.length; i++) {
    if (repeated.has(str[i])) {
      continue;
    }

    if (!unique.has(str[i])) {
      unique.add(str[i]);
    } else {
      unique.delete(str[i]);
      repeated.add(str[i]);
    }
  }

  if (unique.size === 0) {
    return -1;
  }

  for (const char of unique) {
    return str.indexOf(char);
  }
};

test(firstUniqChar, [
  {
    input: ['leetcode'],
    expected: 0,
  },
  {
    input: ['loveleetcode'],
    expected: 2,
  },
  {
    input: ['aabb'],
    expected: -1,
  },
  {
    input: ['aadadaad'],
    expected: -1,
  },
]);
