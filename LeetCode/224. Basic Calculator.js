// https://leetcode.com/problems/basic-calculator/submissions/1959687899
const { test } = require('../test');

const digits = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);

const calculate = (str, start = 0) => {
  let result = 0;
  let sign = 1;

  for (let i = start; i < str.length; i++) {
    const current = str[i];

    if (current === ')') {
      return [result, i];
    }

    if (current === ' ') {
      continue;
    }

    if (current === '+') {
      sign = 1;
      continue;
    }

    if (current === '-') {
      sign = -1;
      continue;
    }

    if (current === '(') {
      const [bracketsResult, closeBracketIndex] = calculate(str, i + 1);

      result += sign * bracketsResult;

      i = closeBracketIndex;

      continue;
    }

    let index = i;
    let temp = '';

    while (digits.has(str[index])) {
      temp += str[index];
      index++;
    }

    i = index - 1;

    result += sign * parseInt(temp);
  }

  return result;
};

test(calculate, [
  {
    input: ['11 + 1'],
    expected: 12,
  },
  {
    input: ['-11 + 1'],
    expected: -10,
  },
  {
    input: [' 2-1 + 2 '],
    expected: 3,
  },
  {
    input: ['4+5+2'],
    expected: 11,
  },
  {
    input: ['1+11-3'],
    expected: 9,
  },
  {
    input: ['(1+(4+5+2)-3)+(6+8)'],
    expected: 23,
  },
]);
