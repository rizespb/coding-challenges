// https://leetcode.com/problems/isomorphic-strings/description
const { test } = require('../test');

const isIsomorphic = (s, t) => {
  if (s.length !== t.length) return false;

  const map = {};
  const usedChars = new Set();

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] && map[s[i]] !== t[i]) {
      return false;
    }

    if (map[s[i]]) {
      continue;
    }

    if (usedChars.has(t[i])) {
      return false;
    }

    map[s[i]] = t[i];

    usedChars.add(t[i]);
  }

  return true;
};

test(isIsomorphic, [
  {
    input: ['egg', 'add'],
    expected: true,
  },
  {
    input: ['foo', 'bar'],
    expected: false,
  },
  {
    input: ['paper', 'title'],
    expected: true,
  },
  {
    input: ['badc', 'baba'],
    expected: false,
  },
]);
