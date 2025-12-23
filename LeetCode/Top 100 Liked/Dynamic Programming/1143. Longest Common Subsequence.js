// https://leetcode.com/problems/longest-common-subsequence/description/

// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

// For example, "ace" is a subsequence of "abcde".
// A common subsequence of two strings is a subsequence that is common to both strings.

// МОП - макисмальная общая подпоследовательность
const longestCommonSubsequence = function (text1, text2) {
  // Создаем матрицу на 1 элемент больше по каждому измерению
  // Первый элемент будет обозначать пустую строку
  const matrix = Array(text2.length + 1)
    .fill(0)
    .map(() => Array(text1.length + 1).fill(-Infinity));

  // МОП для любой строки и пустой строки равен0
  matrix[0].fill(0);

  for (const row of matrix) {
    row[0] = 0;
  }

  // [ 0, 0, 0, 0, 0, 0 ],
  // [ 0, -Infinity, -Infinity, -Infinity, -Infinity, -Infinity ],
  // [ 0, -Infinity, -Infinity, -Infinity, -Infinity, -Infinity ],
  // [ 0, -Infinity, -Infinity, -Infinity, -Infinity, -Infinity ]

  for (let i = 1; i <= text2.length; i++) {
    for (let j = 1; j <= text1.length; j++) {
      if (text2[i - 1] === text1[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }
  console.log(matrix[text2.length][text1.length]);
  return matrix[text2.length][text1.length];
};
