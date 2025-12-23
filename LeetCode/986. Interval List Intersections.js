// https://leetcode.com/problems/interval-list-intersections/description/

const { test } = require('../../test');

const intervalIntersection = function (arr1, arr2) {
  const result = [];

  let index1 = 0;
  let index2 = 0;

  while (index1 < arr1.length && index2 < arr2.length) {
    const [start1, finish1] = arr1[index1];
    const [start2, finish2] = arr2[index2];

    if (start2 > finish1) {
      index1++;
      continue;
    }

    if (start1 > finish2) {
      index2++;
      continue;
    }

    const pair = [Math.max(start1, start2), Math.min(finish1, finish2)];

    result.push(pair);

    if (finish1 > finish2) {
      index2++;
    } else {
      index1++;
    }
  }

  return result;
};

test(intervalIntersection, [
  {
    input: [
      [
        [0, 2],
        [5, 10],
        [13, 23],
        [24, 25],
      ],
      [
        [1, 5],
        [8, 12],
        [15, 24],
        [25, 26],
      ],
    ],
    expected: String([
      [1, 2],
      [5, 5],
      [8, 10],
      [15, 23],
      [24, 24],
      [25, 25],
    ]),
  },
  {
    input: [
      [
        [1, 3],
        [5, 9],
      ],
      [],
    ],
    expected: '',
  },
]);
