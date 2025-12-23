// https://leetcode.com/problems/squares-of-a-sorted-array/

const { test } = require('../test');

const sortedSquares = (nums) => {
  let firstNonZeroIndex = null;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= 0) {
      firstNonZeroIndex = i;
      break;
    }
  }

  const result = [];

  let left = firstNonZeroIndex === null ? nums.length - 1 : firstNonZeroIndex - 1;
  let right = firstNonZeroIndex === null ? Number.POSITIVE_INFINITY : firstNonZeroIndex;

  while (left >= 0 || right < nums.length) {
    if (right >= nums.length || (left >= 0 && Math.abs(nums[left]) < Math.abs(nums[right]))) {
      result.push(nums[left] ** 2);
      left--;
    } else {
      result.push(nums[right] ** 2);
      right++;
    }
  }

  return result.toString();
};

test(sortedSquares, [
  {
    input: [[-4, -1, 0, 3, 10]],
    expected: [0, 1, 9, 16, 100].toString(),
  },
  {
    input: [[-7, -3, 2, 3, 11]],
    expected: [4, 9, 9, 49, 121].toString(),
  },
  {
    input: [[-1]],
    expected: [1].toString(),
  },
  {
    input: [[-10000, -9999, -7, -5, 0, 0, 10000]],
    expected: [0, 0, 25, 49, 99980001, 100000000, 100000000].toString(),
  },
  {
    input: [[-1, 2, 2]],
    expected: [1, 4, 4].toString(),
  },
]);
