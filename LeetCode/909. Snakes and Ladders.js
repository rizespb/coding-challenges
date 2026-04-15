// https://leetcode.com/problems/snakes-and-ladders/description/

const { test } = require('../test');

const getCoords = (value, size) => {
  const row = size - 1 - (Math.ceil(value / size) - 1);

  let column;

  if (size % 2 === row % 2) {
    // Reversed order
    column = size - 1 - ((value - 1) % size);
  } else {
    // Direct order
    column = (value - 1) % size;
  }

  return [row, column];
};

const snakesAndLadders = (board) => {
  const size = board.length;
  const maxValue = size ** 2;

  const results = [];

  const visited = {};

  const queue = [[1, 0]];

  while (queue.length) {
    const [value, num] = queue.shift();

    if (value === maxValue) {
      results.push(num);
      continue;
    }

    if (visited[value] && num >= visited[value]) {
      continue;
    }

    visited[value] = num;

    let lastEmptyIndex;

    for (let i = value + 1; i <= Math.min(value + 6, maxValue); i++) {
      const [row, column] = getCoords(i, size);

      if (board[row][column] !== -1) {
        queue.push([board[row][column], num + 1]);

        continue;
      }

      if (i === maxValue) {
        queue.push([i, num + 1]);
      }

      lastEmptyIndex = i;
    }

    queue.push([lastEmptyIndex, num + 1]);
  }

  return results.length ? Math.min(...results) : -1;
};

// 11/1
// 21 22 23 24 25
// 20 19 18 17 16
// 11 12 13 14 15
//  10 9  8  7  6
//  1  2  3  4  5

test(snakesAndLadders, [
  {
    input: [
      [
        [-1, 10, -1, 15, -1],
        [-1, -1, 18, 2, 20],
        [-1, -1, 12, -1, -1],
        [2, 4, 11, 18, 8],
        [-1, -1, -1, -1, -1],
      ],
    ],
    expected: 3,
  },
  {
    input: [
      [
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, 35, -1, -1, 13, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, 15, -1, -1, -1, -1],
      ],
    ],
    expected: 4,
  },
  {
    input: [
      [
        [-1, -1],
        [-1, 3],
      ],
    ],
    expected: 1,
  },
]);
