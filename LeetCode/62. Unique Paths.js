// https://leetcode.com/problems/unique-paths/description/

const { test } = require('../test');

// Решение 1
// const uniquePaths = (height, width) => {
//   const matrix = Array.from({ length: height }, () => Array.from({ length: width }));

//   for (let i = 0; i < height || i < width; i++) {
//     if (i < height) matrix[i][0] = 1;
//     if (i < width) matrix[0][i] = 1;
//   }

//   for (let outer = 1; outer < matrix.length; outer++) {
//     for (let inner = 1; inner < matrix[0].length; inner++) {
//       matrix[outer][inner] = matrix[outer][inner - 1] + matrix[outer - 1][inner];
//     }
//   }

//   return matrix.at(-1).at(-1);
// };

// Решение 2
// Такое же, как Решение 1, но оптимизировано по времени и немного по памяти (dp вместо matrix)
const uniquePaths = (height, width) => {
  const dp = Array.from({ length: width }).fill(1);

  for (let outer = 1; outer < height; outer++) {
    for (let inner = 1; inner < width; inner++) {
      dp[inner] = dp[inner] + dp[inner - 1];
    }
  }

  return dp.at(-1);
};

test(uniquePaths, [
  {
    input: [3, 7],
    expected: 28,
  },
  {
    input: [3, 2],
    expected: 3,
  },
]);
