// https://leetcode.com/problems/minimum-size-subarray-sum/description/
const { test } = require('../test');

// const minSubArrayLen = (target, nums) => {
//   const dp = Array(nums.length);

//   dp[0] = nums[0];

//   if (dp[0] >= target) return 1;

//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] >= target) return 1;

//     dp[i] = dp[i - 1] + nums[i];
//   }

//   let minLength = 0;

//   let index = 0;

//   while (index < dp.length) {
//     if (dp[index] < target) {
//       index++;
//       continue;
//     }

//     if (minLength === 0) {
//       minLength = index + 1;
//       continue;
//     }

//     let currentSum = nums[index];
//     let left = index;

//     while (currentSum < target && index - left + 1 < minLength) {
//       left--;
//       currentSum += nums[left];
//     }

//     minLength = Math.min(minLength, index - left + 1);
//     index++;
//   }

//   return minLength;
// };

// Sliding  window approach
const minSubArrayLen = (target, nums) => {
  let minLength = Number.POSITIVE_INFINITY;

  let left = 0;

  let currentSum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) return 1;

    currentSum += nums[i];

    if (currentSum < target) continue;

    while (currentSum >= target) {
      currentSum -= nums[left];
      left++;
    }

    minLength = Math.min(minLength, i - left + 2);
  }

  return minLength === Number.POSITIVE_INFINITY ? 0 : minLength;
};

test(minSubArrayLen, [
  {
    input: [7, [2, 3, 1, 2, 4, 3]],
    expected: 2,
  },
  {
    input: [11, [1, 2, 3, 4, 5]],
    expected: 3,
  },
  {
    input: [4, [1, 4, 4]],
    expected: 1,
  },
  {
    input: [11, [1, 1, 1, 1, 1, 1, 1, 1]],
    expected: 0,
  },
]);
