// https://leetcode.com/problems/intersection-of-two-arrays-ii/description/
const { test } = require('../../test');

const intersect = (nums1, nums2) => {
  const map = new Map();

  for (const num of nums1) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  const result = [];

  for (const num of nums2) {
    const counter = map.get(num);

    if (counter) {
      result.push(num);
      map.set(num, counter - 1);
    }
  }

  return result.join(' ');
};

test(intersect, [
  {
    input: [
      [1, 2, 2, 1],
      [2, 2],
    ],
    expected: [2, 2].join(' '),
  },
  {
    input: [
      [4, 9, 5],
      [9, 4, 9, 8, 4],
    ],
    expected: [9, 4].join(' '),
  },
]);
