// https://leetcode.com/problems/move-zeroes/description/

// Решение 1
// const moveZeroes = (arr) => {
//   for (let i = arr.length - 1; i >= 0; i--) {
//     const current = arr[i];

//     if (current !== 0 || i === arr.length - 1) {
//       continue;
//     }

//     let j = i;

//     while (j < arr.length - 1) {
//       [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
//       j++;
//     }
//   }

//   return arr;
// };

// Решение 2
// Похоже на решение 1, но позволяет избежать вложенного цикла за счет хранения позиций нулей zero и общего количества найденных нулей
const moveZeroes = (arr) => {
  const zeros = [];

  let zerosCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      zeros.push(i);
      zerosCount++;
      continue;
    }

    if (zerosCount) {
      [arr[i], arr[zeros.at(-zerosCount)]] = [arr[zeros.at(-zerosCount)], arr[i]];

      // Теперь 0 хранится по индексу i
      zeros.push(i);
    }
  }

  return arr;
};

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log(moveZeroes([0])); // [0]
