// https://leetcode.com/problems/max-consecutive-ones-iii/description/
const { test } = require('../../test');

const longestOnes = function (nums, zeros) {
  let left = 0;
  let right = 0;

  let countZeros = zeros;

  let maxAmount = 0;
  let currentAmount = 0;

  while (right < nums.length) {
    const value = nums[right];

    if (value === 1 || countZeros > 0) {
      if (value === 0) {
        countZeros--;
      }

      currentAmount++;
      right++;

      maxAmount = Math.max(currentAmount, maxAmount);

      continue;
    }

    while (countZeros <= 0) {
      if (nums[left] === 0) {
        countZeros++;
      }

      left++;
      currentAmount--;
    }
  }

  return maxAmount;
};

test(longestOnes, [
  {
    input: [[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2],
    expected: 6,
  },
  {
    input: [[0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3],
    expected: 10,
  },
]);
