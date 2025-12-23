// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
const { test } = require('../test');

const findMin = (nums) => {
  let start = 0;
  let end = nums.length - 1;

  let min = Number.POSITIVE_INFINITY;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    min = Math.min(min, nums[middle]);

    if (nums[middle] > nums[end]) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }

  return min;
};

test(findMin, [
  {
    input: [[2, 3, 4, 5, 1]],
    expected: 1,
  },
  {
    input: [[3, 4, 5, 1, 2]],
    expected: 1,
  },
  {
    input: [[4, 5, 6, 7, 0, 1, 2]],
    expected: 0,
  },
  {
    input: [[11, 13, 15, 17]],
    expected: 11,
  },
]);
