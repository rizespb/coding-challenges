// https://leetcode.com/problems/factorial-trailing-zeroes/description/

const { test } = require('../test');

// Решение не проходит тесты по времени
// const trailingZeroes = (n) => {
//   let factorial = 1;

//   for (let i = 2; i <= n; i++) {
//     factorial *= i;
//   }

//   let count = 0;

//   while (factorial > 10) {
//     const rest = factorial % 10;

//     if (rest !== 0) {
//       break;
//     }

//     count++;
//     factorial = factorial / 10;
//   }

//   return count;
// };

// Идея в том, что каждый ноль 0 в конце дает присутствие 10 в ряду факториала
// 11! = 39916800
// 1*2*3*4*5*6*7*8*9*10*11
// каждую 10 можно представить как 5*2
// 1*2*3*4*5*6*7*8*9*5*2*11
// Каждое число,оканчивающееся на 5 или 0 состоит из 5 умноженной на что-то
// А некоторые числа из нескольких 5: 25 = 5*5, 125 = 5*5*5
// Чтобы эти 5 давали ноль, они должны умножаться на четное число
// Четных чисел всегда больше в последовательности факториала, чем пятерок 5
// Поэтому нам надо посчитать количество 5 в ряду факториала
const trailingZeroes = (n) => {
  let count = 0;

  while (n >= 5) {
    const rest = Math.floor(n / 5);
    count += rest;
    n = rest;
  }

  return count;
};

test(trailingZeroes, [
  {
    input: [3],
    expected: 0,
  },
  {
    input: [5],
    expected: 1,
  },
  {
    input: [0],
    expected: 0,
  },
  {
    input: [30],
    expected: 7,
  },
  {
    input: [125],
    expected: 31,
  },
]);
