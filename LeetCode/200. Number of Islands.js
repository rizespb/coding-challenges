// https://leetcode.com/problems/number-of-islands/description/

const { test } = require('../../test');

const setNearestToZero = (y, x, maxY, maxX, matrix) => {
  if (y < 0 || x < 0 || y > maxY || x > maxX || matrix[y][x] === '0') {
    return;
  }

  matrix[y][x] = '0';

  y < maxY && setNearestToZero(y + 1, x, maxY, maxX, matrix);
  y > 0 && setNearestToZero(y - 1, x, maxY, maxX, matrix);
  x < maxX && setNearestToZero(y, x + 1, maxY, maxX, matrix);
  x > 0 && setNearestToZero(y, x - 1, maxY, maxX, matrix);
};

const numIslands = (matrix) => {
  let counter = 0;

  const maxY = matrix.length - 1;
  const maxX = matrix[0].length - 1;

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (matrix[y][x] === '1') {
        counter++;

        setNearestToZero(y, x, maxY, maxX, matrix);
      }
    }
  }

  return counter;
};

const matrix1 = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0'],
];

const matrix2 = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
];

const matrix3 = [['1'], ['1']];

test(numIslands, [
  {
    input: [matrix1],
    expected: 1,
  },
  {
    input: [matrix2],
    expected: 3,
  },
  {
    input: [matrix3],
    expected: 1,
  },
]);
