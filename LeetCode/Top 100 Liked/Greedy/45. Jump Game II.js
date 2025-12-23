// https://leetcode.com/problems/jump-game-ii/description/

// You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

// Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

// 0 <= j <= nums[i] and
// i + j < n
// Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

const jump = (nums) => {
  const dp = Array.from({ length: nums.length });
  dp[0] = 0;

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];

    for (let j = i + 1; j <= i + current && j < nums.length; j++) {
      if (dp[j] === undefined) {
        dp[j] = dp[i] + 1;

        continue;
      }

      dp[j] = Math.min(dp[j], dp[i] + 1);
    }
  }

  return dp.at(-1);
};
