// https://leetcode.com/problems/search-a-2d-matrix-ii/description/

// Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix. This matrix has the following properties:

// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.

const searchMatrix = (matrix, target) => {
  let x = matrix[0].length - 1;
  let y = 0;

  while (x >= 0 && y <= matrix.length - 1) {
    const current = matrix[y][x];

    if (current === target) {
      return true;
    }

    if (target < current) {
      x--;
    } else {
      y++;
    }
  }

  return false;
};
