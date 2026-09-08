// https://leetcode.com/problems/3sum/description/

const { test } = require('../test');

const threeSum = (nums) => {
  nums.sort((a, b) => a - b);

  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      let shouldChangeLeft = false;
      let shouldChangeRight = false;

      let sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[left], nums[right], nums[i]]);

        shouldChangeLeft = true;
        shouldChangeRight = true;
      }

      if (sum > 0) {
        shouldChangeRight = true;
      }

      if (sum < 0) {
        shouldChangeLeft = true;
      }

      if (shouldChangeRight) {
        right--;
        while (nums[right] === nums[right + 1]) {
          right--;
        }
      }

      if (shouldChangeLeft) {
        left++;
        while (nums[left] === nums[left - 1]) {
          left++;
        }
      }
    }
  }

  return result;
};

test(threeSum, [
  {
    input: [[-1, 0, 1, 2, -1, -4]],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    input: [[0, 1, 1]],
    expected: [],
  },
  {
    input: [[0, 0, 0]],
    expected: [0, 0, 0],
  },
]);
