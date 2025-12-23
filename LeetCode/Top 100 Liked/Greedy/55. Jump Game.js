// https://leetcode.com/problems/jump-game/description/

// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

// Return true if you can reach the last index, or false otherwise.

const canJump = function (nums) {
  let end = 0;

  for (let i = 0; i < nums.length; i++) {
    if (end < i) {
      return false;
    }

    end = Math.max(i + nums[i], end);
  }

  return end >= nums.length - 1;
};
