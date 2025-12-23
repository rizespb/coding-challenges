// https://leetcode.com/problems/search-in-rotated-sorted-array/description/

const { test } = require('../test');

const search = (nums, target) => {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    let middle = Math.floor((start + end) / 2);

    if (nums[middle] === target) {
      return middle;
    }

    // значит левая часть имеет "прямой порядок элементов"
    if (nums[middle] >= nums[start]) {
      if (target < nums[middle] && target >= nums[start]) {
        end = middle - 1; // идем влево
      } else {
        start = middle + 1; // идем вправо
      }

      // значит правая часть имеет "прямой порядок элементов"
    } else {
      if (target > nums[middle] && target <= nums[end]) {
        start = middle + 1; // идем вправо
      } else {
        end = middle - 1; // идем влево
      }
    }
  }

  return -1;
};

test(search, [
  {
    input: [[4, 5, 6, 7, 8, 1, 2, 3], 8],
    expected: 4,
  },
  {
    input: [[1, 3], 3],
    expected: 1,
  },
  {
    input: [[5, 1, 3], 5],
    expected: 0,
  },
  {
    input: [[4, 5, 6, 7, 0, 1, 2], 0],
    expected: 4,
  },
  {
    input: [[4, 5, 6, 7, 0, 1, 2], 3],
    expected: -1,
  },
  {
    input: [[1], 0],
    expected: -1,
  },
]);
