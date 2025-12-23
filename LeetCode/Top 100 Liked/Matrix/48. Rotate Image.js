// https://leetcode.com/problems/rotate-image/description/

// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

const rotate = function (matrix) {
  const x = matrix[0].length;
  const y = matrix.length;

  const stack = [];

  for (let j = x - 1; j >= 0; j--) {
    for (let i = 0; i < y; i++) {
      stack.push(matrix[i][j]);
    }
  }

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      const current = stack.pop();
      matrix[i][j] = current;
    }
  }

  return matrix;
};
