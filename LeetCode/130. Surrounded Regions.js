// https://leetcode.com/problems/surrounded-regions/description/

const { test } = require('../test');

// В решении на Python используется более оптимальный алгоритм
const solve = (board) => {
  const maxX = board[0].length - 1;
  const maxY = board.length - 1;

  const checkRegion = (x, y) => {
    const stack = [x, y];

    let isEdge = false;

    const currentPoints = [];

    while (stack.length) {
      const y = stack.pop();
      const x = stack.pop();

      board[y][x] = 'X';

      currentPoints.push(x, y);

      if (x === 0 || x === maxX || y === 0 || y === maxY) {
        isEdge = true;
      }

      if (y > 0 && board[y - 1][x] === 'O') {
        stack.push(x, y - 1);
      }
      if (y < maxY && board[y + 1][x] === 'O') {
        stack.push(x, y + 1);
      }
      if (x > 0 && board[y][x - 1] === 'O') {
        stack.push(x - 1, y);
      }
      if (x < maxX && board[y][x + 1] === 'O') {
        stack.push(x + 1, y);
      }
    }

    if (!isEdge) {
      return;
    }

    while (currentPoints.length) {
      const y = currentPoints.pop();
      const x = currentPoints.pop();
      board[y][x] = 'checked';
    }
  };

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const current = board[y][x];

      if (current === 'checked' || current === 'X') {
        continue;
      }

      checkRegion(x, y);
    }
  }

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (board[y][x] === 'checked') board[y][x] = 'O';
    }
  }

  return board;
};

test(solve, [
  {
    input: [
      [
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'O', 'X'],
        ['X', 'X', 'O', 'X'],
        ['X', 'O', 'X', 'X'],
      ],
    ],
    expected: [
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'X', 'X'],
    ].toString(),
  },
  {
    input: [
      [
        ['O', 'O'],
        ['O', 'O'],
      ],
    ],
    expected: [
      ['O', 'O'],
      ['O', 'O'],
    ].toString(),
  },
  {
    input: [
      [
        ['X', 'O', 'X', 'O', 'O', 'O', 'O'],
        ['X', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['X', 'O', 'O', 'O', 'O', 'X', 'O'],
        ['O', 'O', 'O', 'O', 'X', 'O', 'X'],
        ['O', 'X', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
        ['O', 'X', 'O', 'O', 'O', 'O', 'O'],
      ],
    ],
    expected: [
      ['X', 'O', 'X', 'O', 'O', 'O', 'O'],
      ['X', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['X', 'O', 'O', 'O', 'O', 'X', 'O'],
      ['O', 'O', 'O', 'O', 'X', 'O', 'X'],
      ['O', 'X', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'O', 'O', 'O', 'O', 'O', 'O'],
      ['O', 'X', 'O', 'O', 'O', 'O', 'O'],
    ].toString(),
  },
]);
