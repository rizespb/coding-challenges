// https://leetcode.com/problems/3sum/description/

// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.

// Решение не проходит тесты по времени
// const findPair = (arr, target, skipIndex) => {
//   const map = {};

//   const result = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (i == skipIndex) {
//       continue;
//     }

//     const current = arr[i];

//     if (map[current] !== undefined) {
//       result.push([current, map[current]]);
//       continue;
//     }

//     map[target - current] = current;
//   }

//   return result;
// };

// const threeSum = (nums) => {
//   const result = [];

//   const unique = new Set();

//   for (let i = 0; i < nums.length; i++) {
//     const current = nums[i];

//     if (unique.has(current)) {
//       continue;
//     }

//     const pairs = findPair(nums, -current, i);

//     const currentResult = pairs.map((arr) => {
//       arr.push(current);
//       return arr;
//     });

//     result.push(...currentResult);

//     unique.add(current);
//   }

//   const uniqueArrs = new Set();

//   return result.filter((arr) => {
//     arr.sort((a, b) => a - b);
//     const concated = arr.join('_');

//     if (uniqueArrs.has(concated)) {
//       return false;
//     }

//     uniqueArrs.add(concated);

//     return true;
//   });
// };

const threeSum = (nums) => {
  const result = [];

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    }

    let j = i + 1;
    let k = nums.length - 1;

    while (j < k) {
      let total = nums[i] + nums[j] + nums[k];

      if (total > 0) {
        k--;
      } else if (total < 0) {
        j++;
      } else {
        result.push([nums[i], nums[j], nums[k]]);
        j++;

        while (nums[j] === nums[j - 1] && j < k) {
          j++;
        }
      }
    }
  }

  return result;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
console.log(threeSum([0, 1, 1])); // []
console.log(threeSum([0, 0, 0])); // [[0,0,0]]
