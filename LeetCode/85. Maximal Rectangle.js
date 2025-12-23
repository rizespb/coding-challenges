// https://leetcode.com/problems/maximal-rectangle/description/

// const maximalRectangle = (matrix) => {
//   const matrixSize = matrix.length;
//   const rowSize = matrix[0].length;

//   // Массив будет содержать количество непрерывно заполненных (1) ячеек в каждой колонке
//   const dp = Array.from({ length: rowSize }).fill(0);

//   let maxArea = 0;

//   // Проходим по каждому ряду
//   for (let i = 0; i < matrixSize; i++) {
//     // Проходим по каждому элементу в ряду
//     for (let k = 0; k < rowSize; k++) {
//       const current = matrix[i][k];

//       // Если 0, то обнуляем количество в dp
//       // В противном случае добавляем 1
//       dp[k] = current === '0' ? 0 : dp[k] + 1;
//     }

//     // После того, как перебрали очередной ряд, считаем на основе текущего dp возможные площади и сохраняем в dp
//     // К этому моменту dp может выглядеть например так
//     // 3 2 2 0 1 2 3
//     // мы перебираем все последовательности:
//     // 3, 32, 322 ... 1, 12, 123 ... 23, 3
//     // Выбираем из каждой последовательности минимальное число и умножаем на количество чисел в этой последовательности - получаем площадь для этой последовательности
//     // И сохраняем или максмимальную площадь

//     for (let i = 0; i < dp.length; i++) {
//       if (dp[i] === 0) {
//         continue;
//       }

//       // Количество чисел в последовательности
//       let count = 0;

//       //
//       let minValueInSequence = Infinity;

//       for (let k = i; k < dp.length; k++) {
//         // Сбрасываем значения, если
//         if (dp[k] === 0) {
//           count = 0;
//           minValueInSequence = Infinity;
//           continue;
//         }

//         const current = dp[k];

//         count++;
//         minValueInSequence = Math.min(minValueInSequence, current);

//         maxArea = Math.max(maxArea, count * minValueInSequence);
//       }
//     }
//   }

//   return maxArea;
// };

const maximalRectangle = (matrix) => {
  const dp = new Array(matrix[0].length).fill(0);

  let maxArea = 0;

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];

    for (let k = 0; k < row.length; k++) {
      dp[k] = row[k] === '0' ? 0 : dp[k] + 1;
    }

    for (let x = 0; x < dp.length; x++) {
      let currentMin = Number.POSITIVE_INFINITY;

      if (dp[x] === 0) continue;

      for (let y = x; y < dp.length; y++) {
        if (dp[y] === 0) break;

        currentMin = Math.min(currentMin, dp[y]);

        maxArea = Math.max(maxArea, currentMin * (y - x + 1));
      }
    }
  }

  return maxArea;
};

maximalRectangle([
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0'],
]); // 6
maximalRectangle([['0']]); // 0
maximalRectangle([['1']]); // 1
