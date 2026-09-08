const { test } = require('./test');

const search = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const pivotIndex = Math.floor((right + left) / 2);
    const pivot = nums[pivotIndex];

    if (pivot === target) return pivotIndex;

    const isPivotInLeft = pivot >= nums[left];

    if (isPivotInLeft) {
      if (target >= nums[left] && target < pivot) {
        right = pivotIndex - 1;
      } else {
        left = pivotIndex + 1;
      }
    } else {
      if (target > pivot && target <= nums[right]) {
        left = pivotIndex + 1;
      } else {
        right = pivotIndex - 1;
      }
    }
  }

  return -1;
};

test(search, [
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
