// https://leetcode.com/problems/kth-largest-element-in-an-array/

const { test } = require('../test');

const findKthLargest = (nums, k) => {
  const min = Math.min(...nums);
  const max = Math.max(...nums);

  const array = new Array(max - min + 1).fill(0);

  for (const num of nums) {
    const index = num - min;

    array[index]++;
  }

  let count = k;

  for (let i = array.length - 1; i >= 0; i--) {
    count = count - array[i];

    if (count <= 0) {
      return i + min;
    }
  }
};

test(findKthLargest, [
  {
    input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
    expected: 4,
  },
  {
    input: [[3, 2, 1, 5, 6, 4], 2],
    expected: 5,
  },
  {
    input: [[99, 99], 1],
    expected: 99,
  },
  {
    input: [[-1, -1], 2],
    expected: -1,
  },
  {
    input: [[-1, 2, 0], 2],
    expected: 0,
  },
]);
