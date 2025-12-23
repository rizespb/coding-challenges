// https://leetcode.com/problems/move-zeroes/description/

// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Note that you must do this in-place without making a copy of the array.

const moveZeroes = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const current = arr[i];

    if (current !== 0 || i === arr.length - 1) {
      continue;
    }

    let j = i;

    while (j < arr.length - 1) {
      [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      j++;
    }
  }

  return arr;
};

console.log(moveZeroes([2, 0, 1, 0, 3, 12])); // [ 2, 1, 3, 12, 0, 0 ]
