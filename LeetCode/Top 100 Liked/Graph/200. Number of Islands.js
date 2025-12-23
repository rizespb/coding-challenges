// https://leetcode.com/problems/number-of-islands/description/

// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

const updateGrid = (grid, y, x) => {
  const stack = [
    {
      y,
      x,
    },
  ];

  while (stack.length > 0) {
    const { y, x } = stack.pop();

    grid[y][x] = 'checked';

    const left = { y, x: x - 1 };
    const right = { y, x: x + 1 };
    const up = { y: y - 1, x };
    const down = { y: y + 1, x };

    [left, right, up, down].forEach(({ y, x }) => {
      const value = grid[y]?.[x];

      if (value === '1') {
        stack.push({ y, x });
      }
    });
  }
};

const numIslands = (grid) => {
  const copy = structuredClone(grid);

  let islands = 0;

  for (let i = 0; i < copy.length; i++) {
    const row = copy[i];

    for (let j = 0; j < row.length; j++) {
      const current = copy[i][j];

      if (current === '1') {
        islands++;

        updateGrid(copy, i, j);
      }
    }
  }

  return islands;
};
