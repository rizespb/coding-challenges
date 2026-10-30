// https://leetcode.com/problems/merge-intervals/description/

const { test } = require('../test');

const merge = (intervals) => {
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [];

  let index = 0;

  let start = intervals[0][0];
  let end = intervals[0][1];

  while (index < intervals.length) {
    const current = intervals[index];

    if (current[0] > end) {
      result.push([start, end]);
      start = current[0];
      end = current[1];

      index++;
      continue;
    }

    if (end < current[1]) {
      end = current[1];
    }

    index++;
  }

  result.push([start, end]);

  return result;
};

test(merge, [
  {
    input: [
      [
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ],
    ],
    expected: [
      [1, 6],
      [8, 10],
      [15, 18],
    ].toString(),
  },
  {
    input: [
      [
        [1, 4],
        [4, 5],
      ],
    ],
    expected: [[1, 5]].toString(),
  },
  {
    input: [
      [
        [4, 7],
        [1, 4],
      ],
    ],
    expected: [[[1, 7]]].toString(),
  },
]);
