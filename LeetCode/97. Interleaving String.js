// https://leetcode.com/problems/interleaving-string/description/

const { test } = require('./test');

// Решение не проходит тесты по времени
// const isInterleave = (s1, s2, s3) => {
//   if (s1.length + s2.length !== s3.length) return false;

//   const inner = (start1, start2, start3) => {
//     let index1 = start1;
//     let index2 = start2;
//     let index3 = start3;

//     while (index3 < s3.length) {
//       const value1 = s1[index1];
//       const value2 = s2[index2];
//       const value3 = s3[index3];

//       if (value3 === value1 && value3 !== value2) {
//         index3++;
//         index1++;

//         continue;
//       }

//       if (value3 === value2 && value3 !== value1) {
//         index3++;
//         index2++;

//         continue;
//       }

//       if (value3 !== value1 && value3 !== value2) {
//         return false;
//       }

//       return inner(index1 + 1, index2, index3 + 1) || inner(index1, index2 + 1, index3 + 1);
//     }

//     return true;
//   };

//   return inner(0, 0, 0);
// };

const isInterleave = (s1, s2, s3) => {
  const length1 = s1.length;
  const length2 = s2.length;
  const length3 = s3.length;

  // Если сумма для строк 1 и 2 не равна длине 3 строки, то false
  if (length1 + length2 !== length3) return false;

  // Создаем матрицу размером по высоте length1 + 1 и по длине length2 + 1
  const dp = Array.from({ length: length1 + 1 }, () => Array.from({ length: length2 + 1 }).fill(false));

  // Из двух пустых строк всегда можно собрать третью пустую строку
  dp[0][0] = true;

  // Заполняем нулевой столбец в таблице
  // В каждой ячейке будет значение:
  // Содержимое будет эквивалентно кейсу, если 2 строка пустая
  // Т.е. можно ли составить строку 3 только из элементов строки 1
  for (let i = 1; i <= s1.length; i++) {
    dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
  }

  // Аналогично для нулевой строки
  // Содержимое будет эквивалентно кейсу, если 1 строка пустая
  for (let i = 1; i <= s2.length; i++) {
    dp[0][i] = dp[0][i - 1] && s2[i - 1] === s3[i - 1];
  }

  // Заполняем остальную матрицу
  for (let row = 1; row <= length1; row++) {
    for (let column = 1; column <= length2; column++) {
      // Если в текущей позиции подставим элемент из 1 строки
      let isS1CharValid = dp[row - 1][column] && s1[row - 1] === s3[row + column - 1];

      // Если в текущей позиции подставим элемент из 2 строки
      let isS2CharValid = dp[row][column - 1] && s2[column - 1] === s3[row + column - 1];

      dp[row][column] = isS1CharValid || isS2CharValid;
    }
  }

  // Возвращаем значение правого нижнего угла
  // Если true - значит мы прошли весь путь и составили строку 3
  return dp[length1][length2];
};

test(isInterleave, [
  {
    input: ['aabc', 'dbbca', 'aadbbcbca'],
    expected: true,
  },
  {
    input: ['aabcc', 'dbbca', 'aadbbbaccc'],
    expected: false,
  },
  {
    input: ['', '', ''],
    expected: true,
  },
  {
    input: [
      'bbbbbabbbbabaababaaaabbababbaaabbabbaaabaaaaababbbababbbbbabbbbababbabaabababbbaabababababbbaaababaa',
      'babaaaabbababbbabbbbaabaabbaabbbbaabaaabaababaaaabaaabbaaabaaaabaabaabbbbbbbbbbbabaaabbababbabbabaab',
      'babbbabbbaaabbababbbbababaabbabaabaaabbbbabbbaaabbbaaaaabbbbaabbaaabababbaaaaaabababbababaababbababbbababbbbaaaabaabbabbaaaaabbabbaaaabbbaabaaabaababaababbaaabbbbbabbbbaabbabaabbbbabaaabbababbabbabbab',
    ],
    expected: false,
  },
]);
