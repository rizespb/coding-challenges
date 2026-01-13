// https://leetcode.com/problems/h-index/description/

const { test } = require('../test');

const hIndex = (citations) => {
  citations.sort((a, b) => b - a);

  for (let i = 0; i < citations.length; i++) {
    if (citations[i] < i + 1) {
      return i;
    }
  }

  return citations.length;
};

test(hIndex, [
  {
    input: [[3, 0, 6, 1, 5]], // [6, 5, 3, 1 , 0]
    expected: 3,
  },
  {
    input: [[1, 3, 1]],
    expected: 1,
  },
  {
    input: [[1]],
    expected: 1,
  },
]);
