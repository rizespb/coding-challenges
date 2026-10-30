// https://leetcode.com/problems/container-with-most-water/description/

const { test } = require('../test');

// right - left * min
const maxArea = (heights) => {
  let left = 0;
  let right = heights.length - 1;

  let max = 0;

  while (left < right) {
    // const current = (right - left) * Math.min(heights[right], heights[left]);
    const current = (right - left) * (heights[right] < heights[left] ? heights[right] : heights[left]);

    // max = Math.max(max, current);
    max = max < current ? current : max;

    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return max;
};

test(maxArea, [
  {
    input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
    expected: 49,
  },
  {
    input: [[1, 1]],
    expected: 1,
  },
]);
