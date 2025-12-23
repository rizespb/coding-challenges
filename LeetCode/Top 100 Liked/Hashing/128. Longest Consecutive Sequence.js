// https://leetcode.com/problems/longest-consecutive-sequence/description/

// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

// You must write an algorithm that runs in O(n) time.

const longestConsecutive = (nums) => {
  if (nums.length === 0) {
    return 0;
  }

  let copy = [...new Set(nums)];
  copy.sort((a, b) => a - b);

  let max = 0;
  let currentMax = 1;

  for (let i = 1; i < copy.length; i++) {
    const current = copy[i];
    const prev = copy[i - 1];

    if (current - prev === 1) {
      currentMax++;
    } else {
      max = Math.max(currentMax, max);
      currentMax = 1;
    }
  }

  max = Math.max(currentMax, max);

  return max;
};
