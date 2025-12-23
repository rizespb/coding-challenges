// https://leetcode.com/problems/spiral-matrix/description/

// Given an m x n matrix, return all elements of the matrix in spiral order.

const spiralOrder = function (matrix) {
  const result = [];

  const copy = Array(matrix.length)
    .fill()
    .map(() => Array(matrix[0].length).fill(true));

  let direction = 'right';

  let x = 0;
  let y = 0;

  while (result.length < matrix.length * matrix[0].length) {
    result.push(matrix[y][x]);

    copy[y][x] = undefined;

    if (direction === 'right') {
      x++;
    } else if (direction === 'down') {
      y++;
    } else if (direction === 'left') {
      x--;
    } else if (direction === 'up') {
      y--;
    }

    const next = copy[y]?.[x];

    if (next !== undefined) {
      continue;
    }

    if (direction === 'right') {
      x--;
      y++;
      direction = 'down';
    } else if (direction === 'down') {
      x--;
      y--;
      direction = 'left';
    } else if (direction === 'left') {
      x++;
      y--;
      direction = 'up';
    } else if (direction === 'up') {
      x++;
      y++;
      direction = 'right';
    }
  }

  return result;
};
