// https://leetcode.com/problems/spiral-matrix/description/

const { test } = require('../test');

const spiralOrder = (matrix) => {
  const total = matrix.length * matrix[0].length;
  const result = [];

  let y_min = 0;
  let y_max = matrix.length - 1;
  let x_min = 0;
  let x_max = matrix[0].length - 1;

  let direction = 'right';

  let x = -1;
  let y = 0;

  while (true) {
    if (result.length === total) {
      return result;
    }

    if (direction === 'right' && x < x_max) {
      x++;
    } else if (direction === 'right' && x === x_max) {
      direction = 'down';
      y++;
      y_min++;
    } else if (direction === 'down' && y < y_max) {
      y++;
    } else if (direction === 'down' && y === y_max) {
      direction = 'left';
      x--;
      x_max--;
    } else if (direction === 'left' && x > x_min) {
      x--;
    } else if (direction === 'left' && x === x_min) {
      direction = 'up';
      y--;
      y_max--;
    } else if (direction === 'up' && y > y_min) {
      y--;
    } else if (direction === 'up' && y === y_min) {
      direction = 'right';
      x++;
      x_min++;
    }

    result.push(matrix[y][x]);
  }
};

test(spiralOrder, [
  {
    input: [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    ],
    expected: [1, 2, 3, 6, 9, 8, 7, 4, 5].toString(),
  },
  {
    input: [
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
    ],
    expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7].toString(),
  },
  {
    input: [
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
    ],
    expected: [1, 2, 3, 6, 5, 4].toString(),
  },
]);
