// https://leetcode.com/problems/product-of-array-except-self/description/

// В Python решение по тому же принципу, но за два прохода - чуть более оптимизировано
const productExceptSelf = (nums) => {
  const dp = Array(nums.length);
  const dpReversed = Array(nums.length);

  for (let i = 0; i < nums.length; i++) {
    dp[i] = (dp[i - 1] ?? 1) * nums[i];
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    dpReversed[i] = (dpReversed[i + 1] ?? 1) * nums[i];
  }

  const result = [];

  for (let i = 0; i < nums.length; i++) {
    const product = (dp[i - 1] ?? 1) * (dpReversed[i + 1] ?? 1);

    result.push(product);
  }

  return result.join('-');
};
