// https://leetcode.com/problems/house-robber/description/

const { test } = require('../test');

const rob = (nums) => {
  if (nums.length <= 2) return Math.max(nums[0], nums[1] ?? 0);

  const dp = Array.from({ length: nums.length }).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let index = 2; index < nums.length; index++) {
    dp[index] = Math.max(dp[index - 1], nums[index] + dp[index - 2]);
  }

  return dp.at(-1);
};

test(rob, [
  {
    input: [[1, 2, 3, 1]],
    expected: 4,
  },
  {
    input: [[2, 7, 9, 3, 1]],
    expected: 12,
  },
  {
    input: [[2, 1, 1, 2]],
    expected: 4,
  },
]);
