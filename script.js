const { test } = require('./test');

// const findWinners = (matches) => {
//   const players = new Map();

//   for (const [win, lost] of matches) {
//     if (!players.has(win)) {
//       players.set(win, {
//         win: 0,
//         lost: 0,
//       });
//     }

//     if (!players.has(lost)) {
//       players.set(lost, {
//         win: 0,
//         lost: 0,
//       });
//     }

//     players.get(win).win++;
//     players.get(lost).lost++;
//   }

//   const all_win = [];
//   const one_lost = [];

//   for (const player of players.keys()) {
//     const { lost } = players.get(player);

//     if (lost === 0) all_win.push(player);
//     if (lost === 1) one_lost.push(player);
//   }

//   return [all_win.sort((a, b) => a - b), one_lost.sort((a, b) => a - b)];
// };

const findWinners = (matches) => {
  const all_win = new Set();
  const one_lost = new Set();
  const rest = new Set();

  for (const [win, lost] of matches) {
    const isWinInOneLost = one_lost.has(win);
    const isWinInRest = rest.has(win);

    const isLostInAllWin = all_win.has(lost);
    const isLostInOneLost = one_lost.has(lost);
    const isLostInRest = rest.has(lost);

    if (!isWinInOneLost && !isWinInRest) {
      all_win.add(win);
    }

    if (isLostInAllWin) {
      all_win.delete(lost);
      one_lost.add(lost);
    } else if (isLostInOneLost) {
      one_lost.delete(lost);
      rest.add(lost);
    } else if (!isLostInRest) {
      one_lost.add(lost);
    }
  }

  return [[...all_win].sort((a, b) => a - b), [...one_lost].sort((a, b) => a - b)];
};

test(findWinners, [
  {
    input: [
      [
        [1, 3],
        [2, 3],
        [3, 6],
        [5, 6],
        [5, 7],
        [4, 5],
        [4, 8],
        [4, 9],
        [10, 4],
        [10, 9],
      ],
    ],
    expected: [
      [
        [1, 2, 10],
        [4, 5, 7, 8],
      ],
    ],
  },
  {
    input: [
      [
        [2, 3],
        [1, 3],
        [5, 4],
        [6, 4],
      ],
    ],
    expected: [[1, 2, 5, 6], []],
  },
]);
