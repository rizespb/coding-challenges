// https://leetcode.com/problems/game-of-life/description/

const { test } = require('../test');

const gameOfLife = (board) => {
  const xMax = board[0].length - 1;
  const yMax = board.length - 1;

  const shouldChangeState = (x, y) => {
    const isAlive = board[y][x];

    let alive = 0;

    for (let i = Math.max(y - 1, 0); i <= Math.min(y + 1, yMax); i++) {
      for (let k = Math.max(x - 1, 0); k <= Math.min(x + 1, xMax); k++) {
        if (i === y && k === x) continue;

        board[i][k] && alive++;
      }
    }

    if (!isAlive) {
      return alive === 3;
    }

    return alive < 2 || alive > 3;
  };

  const changeState = [];

  for (let y = 0; y <= yMax; y++) {
    for (let x = 0; x <= xMax; x++) {
      if (shouldChangeState(x, y)) {
        changeState.push([x, y]);
      }
    }
  }

  for (const coords of changeState) {
    const [x, y] = coords;

    board[y][x] = board[y][x] ? 0 : 1;
  }

  return board;
};

test(gameOfLife, [
  {
    input: [
      [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ],
    expected: [
      [
        [0, 0, 0],
        [1, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
  {
    input: [
      [
        [1, 1],
        [1, 0],
      ],
    ],
    expected: [
      [1, 1],
      [1, 1],
    ],
  },
]);
