// https://leetcode.com/problems/evaluate-reverse-polish-notation/description/
const { test } = require('../../test');

const map = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => Math.trunc(a / b),
};

const evalRPN = (tokens) => {
  tokens.reverse();

  const nums = [];

  while (tokens.length) {
    const current = tokens.pop();

    if (!map[current]) {
      nums.push(Number(current));

      continue;
    }

    const right = nums.pop();
    const left = nums.pop();

    const result = map[current](left, right);

    nums.push(result);
  }

  return nums[0];
};

test(evalRPN, [
  {
    input: [['2', '1', '+', '3', '*']],
    expected: 9,
  },
  {
    input: [['4', '13', '5', '/', '+']],
    expected: 6,
  },
  {
    input: [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']],
    expected: 22,
  },
]);
