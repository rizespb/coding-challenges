// https://leetcode.com/problems/top-k-frequent-elements/description/

// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

const topKFrequent = (nums, k) => {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];

    if (!map.get(current)) {
      map.set(current, 0);
    }

    map.set(current, map.get(current) + 1);
  }

  const sorted = [...map.entries()].sort(([, a], [, b]) => a - b);

  return sorted.slice(-k).map(([value]) => value);
};
