// https://leetcode.com/problems/triangle/description/

// Перебираем ряды, начиная с предпоследнего и до самого первого
// Для каждого элемента ряда сохраняем минимальное значение: элемент + минимальный из двух элементов под ним
const minimumTotal = (triangle) => {
  const numberOfRows = triangle.length;

  const temp = [...triangle[numberOfRows - 1]];

  for (let i = numberOfRows - 2; i >= 0; i--) {
    const row = triangle[i];

    for (let k = 0; k < row.length; k++) {
      temp[k] = row[k] + Math.min(temp[k], temp[k + 1]);
    }
  }

  return temp[0];
};

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])); // 11
console.log(minimumTotal([[-10]])); // -10

// Рекурсия, не проходит тесты по времени
// const minimumTotal = (triangle) => {
//   let min = +Infinity;

//   const inner = (index, level, sum) => {
//     if (level >= triangle.length) {
//       if (sum < min) {
//         min = sum;
//       }

//       return;
//     }

//     const current = triangle[level][index];

//     inner(index, level + 1, sum + current);
//     inner(index + 1, level + 1, sum + current);
//   };

//   inner(0, 0, 0);

//   return min;
// };
