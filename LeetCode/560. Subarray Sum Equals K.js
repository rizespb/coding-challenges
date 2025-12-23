// https://leetcode.com/problems/subarray-sum-equals-k/description/

const subarraySum = (nums, target) => {
  const map = new Map();

  let result = 0;

  let currentSum = 0;

  for (const value of nums) {
    currentSum += value;

    if (currentSum === target) {
      result++;
    }

    const pairedSum = currentSum - target;

    if (map.has(pairedSum)) {
      result += map.get(pairedSum);
    }

    map.set(currentSum, (map.get(pairedSum) || 0) + 1);
  }

  return result;
};

console.log('Result is: ', subarraySum([1, 1, 1], 2)); // 2
console.log('Result is: ', subarraySum([1, 2, 3], 3)); // 2
console.log('Result is: ', subarraySum([1, -1, 0], 0)); // 3
