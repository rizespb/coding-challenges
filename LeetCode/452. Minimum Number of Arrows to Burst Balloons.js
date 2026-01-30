// https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/

const { test } = require('../test');

// const findMinArrowShots = (points) => {
//   points.sort((a, b) => a[0] - b[0]);

//   const merged = [points[0]];

//   for (let i = 1; i < points.length; i++) {
//     const [start, end] = points[i];

//     if (start > merged.at(-1)[1]) {
//       merged.push(points[i]);
//       continue;
//     }

//     const [merged_start, merged_end] = merged.pop();

//     const balloon = [Math.max(start, merged_start), Math.min(end, merged_end)];

//     merged.push(balloon);
//   }

//   return merged.length;
// };

const findMinArrowShots = (points) => {
  points.sort((a, b) => a[0] - b[0]);

  let count = 0;

  let tail = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < points.length; i++) {
    const [start, end] = points[i];

    if (start <= tail) {
      tail = Math.min(tail, end);
      continue;
    }

    count++;
    tail = end;
  }

  return count;
};

test(findMinArrowShots, [
  {
    input: [
      [
        [10, 16],
        [2, 8],
        [1, 6],
        [7, 12],
      ],
    ],
    expected: 2,
  },
  {
    input: [
      [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ],
    ],
    expected: 4,
  },
  {
    input: [
      [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ],
    ],
    expected: 2,
  },
  {
    input: [
      [
        [3, 9],
        [7, 12],
        [3, 8],
        [6, 8],
        [9, 10],
        [2, 9],
        [0, 9],
        [3, 9],
        [0, 6],
        [2, 8],
      ],
    ],
    expected: 2,
  },
]);
