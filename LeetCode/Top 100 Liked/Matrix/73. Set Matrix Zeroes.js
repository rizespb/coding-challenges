// https://leetcode.com/problems/set-matrix-zeroes/description/

// Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

// You must do it in place.

const setZeroes = (matrix) => {
  let maxX = matrix[0].length - 1;
  let maxY = matrix.length - 1;

  const setY = new Set();
  const setX = new Set();

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (matrix[y][x] === 0) {
        setX.add(x);
        setY.add(y);
      }
    }
  }

  for (const x of setX) {
    for (let y = 0; y < matrix.length; y++) {
      matrix[y][x] = 0;
    }
  }

  for (const y of setY) {
    for (let x = 0; x < matrix[0].length; x++) {
      matrix[y][x] = 0;
    }
  }

  return matrix;
};
