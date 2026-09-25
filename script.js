// const { test } = require('./test');

// const lengthOfLIS = (nums) => {
//   const dp = Array.from({ length: nums.length });

//   dp[0] = 1;

//   let max = 1;

//   for (let index = 1; index < nums.length; index++) {
//     dp[index] = 1;

//     for (let inner = 0; inner < index; inner++) {
//       if (nums[index] > nums[inner]) {
//         dp[index] = Math.max(dp[index], dp[inner] + 1);
//       }
//     }

//     max = Math.max(max, dp[index]);
//   }

//   return max;
// };

// test(lengthOfLIS, [
//   {
//     input: [[10, 9, 2, 5, 3, 7, 101, 18]],
//     expected: 4,
//   },
//   {
//     input: [[0, 1, 0, 3, 2, 3]],
//     expected: 4,
//   },
//   {
//     input: [[7, 7, 7, 7, 7, 7, 7]],
//     expected: 1,
//   },
// ]);

/**
 * @param {Array<() => Promise<any>>} functions - Массив функций, возвращающих промисы
 * @param {number} limit - Максимальное количество одновременно активных промисов
 * @returns {Promise<Array<any>>} - Промис с результатами всех функций
 */
// function poolRequests(functions, limit) {
//   return new Promise((resolve) => {
//     let countFn = 0;

//     const results = [];
//     let countResults = 0;

//     const handler = (result, index) => {
//       results[index] = result;
//       countResults++;

//       if (countResults === functions.length) {
//         resolve(results);

//         return;
//       }

//       if (countFn < functions.length) {
//         const index = countFn;

//         functions[countFn]()
//           .then((result) => handler(result, index))
//           .catch((result) => handler(result, index));
//         countFn++;
//       }
//     };

//     while (countFn < limit) {
//       const index = countFn;

//       functions[countFn]()
//         .then((result) => handler(result, index))
//         .catch((result) => handler(result, index));

//       countFn++;
//     }
//   });
// }

const parent = {
  health: 100,
  takeDamage() {
    this.health -= 10;
  },
};

const child = Object.create(parent);

child.takeDamage();

console.log('child.health:', child.health); // 90
console.log('parent.health:', parent.health); // 90
console.log('hasOwnProperty health:', child.hasOwnProperty('health')); // false
