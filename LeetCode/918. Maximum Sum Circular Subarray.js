// https://leetcode.com/problems/maximum-sum-circular-subarray/description/

const { test } = require('../test');

const maxSubarraySumCircular = (nums) => {
  let totalSum = nums[0];

  let localMax = nums[0];
  let globalMax = nums[0];

  let localMin = nums[0];
  let globalMin = nums[0];

  for (let i = 1; i < nums.length; i++) {
    localMax = Math.max(localMax + nums[i], nums[i]);
    globalMax = Math.max(globalMax, localMax);

    localMin = Math.min(localMin + nums[i], nums[i]);
    globalMin = Math.min(globalMin, localMin);

    totalSum += nums[i];
  }

  if (globalMax < 0) {
    return globalMax;
  }

  return Math.max(globalMax, totalSum - globalMin);
};

test(maxSubarraySumCircular, [
  {
    input: [[1, -2, 3, -2]],
    expected: 3, // 3
  },
  {
    input: [[5, -3, 5]],
    expected: 10, // 7
  },
  {
    input: [[-3, -2, -3]],
    expected: -2, // -2
  },
]);
