// https://leetcode.com/problems/maximum-average-subarray-i/description/

const { test } = require('../test');

const findMaxAverage = (nums, k) => {
  let current = 0;

  for (let index = 0; index < k; index++) {
    current += nums[index];
  }

  let max = current;

  for (let index = k; index < nums.length; index++) {
    current += nums[index] - nums[index - k];

    if (current > max) {
      max = current;
    }
  }

  return max / k;
};

test(findMaxAverage, [
  {
    input: [[1, 12, -5, -6, 50, 3], 4],
    expected: 12.75,
  },
  {
    input: [[5], 1],
    expected: 5,
  },
]);
