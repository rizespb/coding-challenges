// https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/
const longestSubarray = (arr) => {
  let currentMax1 = 0;
  let currentMax2 = 0;

  let max = 0;

  for (let index = 0; index < arr.length; index++) {
    const current = arr[index];

    if (current === 1) {
      currentMax1++;
      currentMax2++;

      continue;
    }

    max = Math.max(max, currentMax1, currentMax2);

    currentMax2 = currentMax1;

    currentMax1 = 0;
  }

  max = Math.max(max, currentMax1, currentMax2);

  return max;
};

console.log(longestSubarray([1, 1, 0, 1])); // 3
console.log(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])); // 5
console.log(longestSubarray([1, 1, 1])); // 2 - обязательно надо удалить хотя бы 1 элемент из исходного массива
