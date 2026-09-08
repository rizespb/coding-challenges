// https://leetcode.com/problems/sort-colors/description/
const { test } = require('../test');

const sortColors = (nums1) => {
  const nums = [...nums1];

  let lastZero = -1;
  let firstTwo = nums.length;

  for (let index = 0; index < nums.length; index++) {
    const current = nums[index];

    if (current === 0) {
      [nums[index], nums[lastZero + 1]] = [nums[lastZero + 1], nums[index]];
      lastZero++;
    }
    if (current === 2 && index < firstTwo) {
      [nums[index], nums[firstTwo - 1]] = [nums[firstTwo - 1], nums[index]];
      firstTwo--;
      index--;
    }
  }

  return nums;
};

test(sortColors, [
  {
    input: [[2, 0, 2, 1, 1, 0]],
    expected: [0, 0, 1, 1, 2, 2],
  },
  {
    input: [[2, 0, 1]],
    expected: [0, 1, 2],
  },
]);
