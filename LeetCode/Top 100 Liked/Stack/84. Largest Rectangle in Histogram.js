// https://leetcode.com/problems/largest-rectangle-in-histogram/description/

// Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

// Решение не проходит по времени
const largestRectangleArea = (arr) => {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    let currentSum = current;

    let left = i - 1;
    let right = i + 1;

    while (left >= 0 && arr[left] >= current) {
      currentSum += current;
      left--;
    }

    while (right < arr.length && arr[right] >= current) {
      currentSum += current;
      right++;
    }

    result = Math.max(result, currentSum);
  }

  return result;
};

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4])); // 4
