// https://leetcode.com/problems/pacific-atlantic-water-flow/description/

const { test } = require('../test');

const pacificAtlantic = (heights) => {
  const rows = heights.length;
  const columns = heights[0].length;

  const pacific = Array.from({ length: rows }).map(() => Array.from({ length: columns }).fill(false));
  const atlantic = Array.from({ length: rows }).map(() => Array.from({ length: columns }).fill(false));

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const dfs = (y, x, ocean) => {
    if (ocean[y][x]) return;

    ocean[y][x] = true;

    for (const [deltaY, deltaX] of directions) {
      const newY = y + deltaY;
      const newX = x + deltaX;

      if (newY < 0 || newY >= rows || newX < 0 || newX >= columns || ocean[newY][newX]) {
        continue;
      }

      if (heights[newY][newX] < heights[y][x]) continue;

      dfs(newY, newX, ocean);
    }
  };

  for (let y = 0; y < rows; y++) {
    dfs(y, 0, pacific);
    dfs(y, columns - 1, atlantic);
  }

  for (let x = 0; x < columns; x++) {
    dfs(0, x, pacific);
    dfs(rows - 1, x, atlantic);
  }

  const result = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (pacific[y][x] && atlantic[y][x]) {
        result.push([y, x]);
      }
    }
  }

  return result;
};

test(pacificAtlantic, [
  {
    input: [
      [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
      ],
    ],
    expected: [
      [0, 4],
      [1, 3],
      [1, 4],
      [2, 2],
      [3, 0],
      [3, 1],
      [4, 0],
    ],
  },
  {
    input: [[[1]]],
    expected: [[0, 0]],
  },
  {
    input: [
      [
        [10, 10, 10],
        [10, 1, 10],
        [10, 10, 10],
      ],
    ],
    expected: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ],
  },
]);
