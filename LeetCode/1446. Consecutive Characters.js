// https://leetcode.com/problems/consecutive-characters/description/

const { test } = require('../../test');

const maxPower = function (str) {
  let currentCount = 0;

  let max = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      currentCount++;
    } else {
      currentCount = 1;
    }

    max = Math.max(currentCount, max);
  }

  return max;
};

test(maxPower, [
  {
    input: ['leetcode'],
    expected: 2,
  },
  {
    input: ['abbcccddddeeeeedcba'],
    expected: 5,
  },
]);
