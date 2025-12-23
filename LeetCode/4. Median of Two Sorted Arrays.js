const { test } = require('../../test');

// Объяснение алгоритма смотри в решении на Python
const findMedianSortedArrays = (numbers1, numbers2) => {
  common_length = numbers1.length + numbers2.length;

  target_index = Math.trunc(common_length / 2);

  const isOdd = common_length % 2 !== 0;

  index1 = 0;
  index2 = 0;

  common_index = 0;

  while (common_index < common_length) {
    if (common_index === target_index) {
      const num1 = numbers1[index1] ?? Infinity;
      const num2 = numbers2[index2] ?? Infinity;

      const prevNum1 = numbers1[index1 - 1] ?? 0;
      const prevNum2 = numbers2[index2 - 1] ?? 0;

      return isOdd ? Math.min(num1, num2) : (Math.min(num1, num2) + Math.max(prevNum1, prevNum2)) / 2;
    }

    if (numbers1[index1] < numbers2[index2] || index2 >= numbers2.length) {
      index1++;
    } else {
      index2++;
    }

    common_index++;
  }
};

test(findMedianSortedArrays, [
  {
    input: [[1, 3], [2]],
    expected: 2,
  },
  {
    input: [
      [1, 2],
      [3, 4],
    ],
    expected: 2.5,
  },
  {
    input: [
      [0, 0],
      [0, 0],
    ],
    expected: 0,
  },
  {
    input: [[], [1]],
    expected: 1,
  },
  {
    input: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    ],
    expected: 9,
  },
  {
    input: [[3, 4], []],
    expected: 3.5,
  },
]);
