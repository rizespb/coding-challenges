// https://leetcode.com/problems/max-points-on-a-line/description/
const { test } = require('../test');

const maxPoints = (points) => {
  if (points.length <= 2) return points.length;

  let maxCount = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2] = points[j];

      let count = 2;

      for (let k = j + 1; k < points.length; k++) {
        const [x3, y3] = points[k];
        // Проверить, что точки не являются треугольником (x2​−x1​)⋅(y3​−y1​)−(y2​−y1​)⋅(x3​−x1​)=0
        if ((x2 - x1) * (y3 - y1) === (y2 - y1) * (x3 - x1)) {
          count++;
        }
      }

      maxCount = Math.max(count, maxCount);
    }
  }

  return maxCount;
};

test(maxPoints, [
  {
    input: [
      [
        [1, 1],
        [2, 2],
        [3, 3],
      ],
    ],
    expected: 3,
  },
  {
    input: [
      [
        [1, 1],
        [3, 2],
        [5, 3],
        [4, 1],
        [2, 3],
        [1, 4],
      ],
    ],
    expected: 4,
  },
  {
    input: [
      [
        [4, 5],
        [4, -1],
        [4, 0],
      ],
    ],
    expected: 3,
  },
  {
    input: [
      [
        [-6, -1],
        [3, 1],
        [12, 3],
      ],
    ],
    expected: 3,
  },
]);
