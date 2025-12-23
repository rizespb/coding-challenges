// https://leetcode.com/problems/valid-parentheses/description/
const { test } = require('../test');

const map = { '(': ')', '{': '}', '[': ']' };
const opens = new Set(Object.keys(map));

const isValid = (str) => {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const current = str[i];

    if (opens.has(current)) {
      stack.push(current);

      continue;
    }

    const top = stack.pop();

    if (map[top] !== current) {
      return false;
    }
  }

  return stack.length === 0;
};

test(isValid, [
  {
    input: ['()'],
    expected: true,
  },
  {
    input: ['()[]{}'],
    expected: true,
  },
  {
    input: ['(]'],
    expected: false,
  },
  {
    input: ['([])'],
    expected: true,
  },
  {
    input: ['([)]'],
    expected: false,
  },
]);
