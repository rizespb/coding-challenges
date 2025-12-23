// https://leetcode.com/problems/merge-sorted-array/description/

const { test } = require('../../test');

const merge = function (arr1, length1, arr2, length2) {
  let index1 = length1 - 1;
  let index2 = length2 - 1;

  let commonIndex = arr1.length - 1;

  while (index1 >= 0 || index2 >= 0) {
    const value1 = arr1[index1];
    const value2 = arr2[index2];

    if (value2 === undefined || (value1 !== undefined && value1 > value2)) {
      arr1[commonIndex] = value1;
      index1--;
    } else {
      arr1[commonIndex] = value2;
      index2--;
    }

    commonIndex--;
  }

  return arr1.toString();
};

test(merge, [
  {
    input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
    expected: [1, 2, 2, 3, 5, 6].toString(),
  },
  {
    input: [[1], 1, [], 0],
    expected: [1].toString(),
  },
  {
    input: [[0], 0, [1], 1],
    expected: [1].toString(),
  },
]);
