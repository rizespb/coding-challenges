// https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

const { test } = require('../test');

// Надо вернуть количество уникальных элементов k и изменить входной массив "на месте",
// чтобы первыми шли уникальные элементы в отсортированном порядке
// После k-того элемента массив может выглядеть как угодно
const removeDuplicates = (nums) => {
  let index = 0;

  let prev;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === prev) {
      continue;
    }

    nums[index] = nums[i];
    prev = nums[i];
    index++;
  }

  return index;
};

test(removeDuplicates, [
  {
    input: [[1, 1, 2]],
    expected: 2, // nums to be [1, 2, _] or [1, 2, 1]
  },
  {
    input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]],
    expected: 5, // nums to be [0, 1, 2, 3 ,4 ,_ ,_, _, _, _] or [0, 1, 2, 3, 4, 0, 1, 1, 2, 3]
  },
]);
