// https://leetcode.com/problems/sliding-window-maximum/description/

const { test } = require('./test');

const maxSlidingWindow = (nums, k) => {
  const result = [];

  const queue = [];
  let head = 0;

  for (let index = 0; index < nums.length; index++) {
    while (queue.length > head && nums[index] > nums[queue.at(-1)]) {
      queue.pop();
    }

    queue.push(index);

    if (index < k - 1) {
      continue;
    }

    result.push(nums[queue[head]]);

    if (queue[head] <= index - k + 1) {
      head++;
    }
  }

  return result;
};

test(maxSlidingWindow, [
  {
    input: [[1, 3, -1, -3, 5, 3, 6, 7], 3],
    expected: [3, 3, 5, 5, 6, 7].toString(),
  },
  {
    input: [[1], 1],
    expected: [1].toString(),
  },
]);
