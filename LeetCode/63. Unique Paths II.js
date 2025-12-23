// const uniquePathsWithObstacles = (grid) => {
//   let count = 0;
//   const maxY = grid.length - 1;
//   const maxX = grid[0].length - 1;

//   if (grid[0][0] === 1) return 0;

//   const inner = (y, x) => {
//     if (y === maxY && x === maxX) {
//       count++;

//       return;
//     }

//     const nextYRight = y;
//     const nextXRight = x + 1;
//     const nextYDown = y + 1;
//     const nextXDown = x;

//     if (grid[nextYRight]?.[nextXRight] === 0) {
//       inner(nextYRight, nextXRight);
//     }

//     if (grid[nextYDown]?.[nextXDown] === 0) {
//       inner(nextYDown, nextXDown);
//     }
//   };

//   inner(0, 0);

//   return count;
// };

const uniquePathsWithObstacles = (grid) => {
  const lengthY = grid.length;
  const lengthX = grid[0].length;

  if (grid[0][0] === 1) return 0;

  const dp = Array.from({ length: lengthX }).fill(0);

  dp[0] = 1;

  // при каждом новом проходе текущее значение dp[x] содержит количество возмоных путей до соответствующей ячейки в предыдущем ряду [y-1][x]
  for (let y = 0; y < lengthY; y++) {
    for (let x = 0; x < lengthX; x++) {
      if (grid[y][x] === 1) {
        dp[x] = 0;
        continue;
      }

      dp[x] = dp[x] + (dp[x - 1] || 0);
    }
  }

  return dp[lengthX - 1];
};

uniquePathsWithObstacles([
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]); // 2
