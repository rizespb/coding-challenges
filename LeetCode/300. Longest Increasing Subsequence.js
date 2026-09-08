// https://leetcode.com/problems/longest-increasing-subsequence/description/

const { test } = require('../test');

const lengthOfLIS = (nums) => {
  const dp = Array.from({ length: nums.length });

  dp[nums.length - 1] = 1;

  let minIndex = nums.length - 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    const current = nums[i];

    let maxLength = 1;

    for (let j = i; j < nums.length; j++) {
      if (current < nums[j]) {
        const possibleLength = dp[j] + 1;
        maxLength = Math.max(maxLength, possibleLength);
      }
    }

    dp[i] = maxLength;
  }

  return Math.max(...dp);
};

test(lengthOfLIS, [
  {
    input: [[10, 9, 2, 5, 3, 7, 101, 18]],
    expected: 4, // 2, 3, 7, 101
  },
  {
    input: [[0, 1, 0, 3, 2, 3]],
    expected: 4, // 0, 1, 2, 3
  },
  {
    input: [[7, 7, 7, 7, 7, 7, 7]],
    expected: 1, // 7
  },
]);
