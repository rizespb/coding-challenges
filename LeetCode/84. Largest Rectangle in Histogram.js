// https://leetcode.com/problems/largest-rectangle-in-histogram/description/

// Решение 1 (не проходят тесты по времени)
// const largestRectangleArea = (arr) => {
//   let max = 0;

//   for (let i = 0; i < arr.length; i++) {
//     let minHeight = arr[i];

//     for (let k = i; k < arr.length; k++) {
//       minHeight = Math.min(minHeight, arr[k]);

//       max = Math.max(max, (k - i + 1) * minHeight);
//     }
//   }

//   return max;
// };

// Решение 2 (не проходят тесты по времени)
// const largestRectangleArea = (arr) => {
//   let result = 0;

//   for (let i = 0; i < arr.length; i++) {
//     let current = arr[i];
//     let currentSum = current;

//     let left = i - 1;
//     let right = i + 1;

//     while (left >= 0 && arr[left] >= current) {
//       currentSum += current;
//       left--;
//     }

//     while (right < arr.length && arr[right] >= current) {
//       currentSum += current;
//       right++;
//     }

//     result = Math.max(result, currentSum);
//   }

//   return result;
// };

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4])); // 4
