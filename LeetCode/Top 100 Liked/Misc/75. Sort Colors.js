// https://leetcode.com/problems/sort-colors/description/

// Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

// We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

// You must solve this problem without using the library's sort function.

const sortColors = (nums) => {
  const map = {
    0: 0,
    1: 0,
    2: 0,
  };

  for (let i = 0; i < nums.length; i++) {
    map[nums[i]]++;
  }

  let count = 0;

  for (let i = 0; i <= 2; i++) {
    while (map[i]) {
      nums[count] = i;
      map[i]--;

      count++;
    }
  }

  return nums;
};

console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0, 0, 1, 1, 2, 2]
console.log(sortColors([2, 0, 1])); // [0, 1, 2]
