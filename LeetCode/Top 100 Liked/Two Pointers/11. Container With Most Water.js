// https://leetcode.com/problems/container-with-most-water/description/

// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

// Find two lines that together with the x-axis form a container, such that the container contains the most water.

// Return the maximum amount of water a container can store.

// Notice that you may not slant the container.

const maxArea = (nums) => {
  let left = 0;
  let right = nums.length - 1;

  let maxLeft = nums[left];
  let maxRight = nums[right];

  let maxWater = 0;

  while (left < right) {
    const min = Math.min(maxLeft, maxRight);
    const minWater = min * (right - left);

    maxWater = Math.max(maxWater, minWater);

    if (maxLeft < maxRight) {
      left++;
      maxLeft = Math.max(maxLeft, nums[left]);
    } else {
      right--;
      maxRight = Math.max(maxRight, nums[right]);
    }
  }

  return maxWater;
};
