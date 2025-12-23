// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
const { test } = require('../test');

// В этой задаче акцент на том, что
// Решение Python использует другой алгоритм
const twoSum = (nums, target) => {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.get(target - nums[i]) !== undefined) {
      return [map.get(target - nums[i]) + 1, i + 1].join('-');
    }

    map.set(nums[i], i);
  }
};

test(twoSum, [
  {
    input: [[2, 7, 11, 15], 9],
    expected: [1, 2].join('-'),
  },
  {
    input: [[2, 3, 4], 6],
    expected: [1, 3].join('-'),
  },
  {
    input: [[-1, 0], -1],
    expected: [1, 2].join('-'),
  },
]);
