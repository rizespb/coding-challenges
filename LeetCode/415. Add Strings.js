// https://leetcode.com/problems/add-strings/description/

const { test } = require('../test');

const addStrings = (num1, num2) => {
  let result = '';

  let rest = 0;

  let index1 = num1.length - 1;
  let index2 = num2.length - 1;

  while (index1 >= 0 || index2 >= 0) {
    const value1 = index1 >= 0 ? Number(num1[index1]) : 0;
    const value2 = index2 >= 0 ? Number(num2[index2]) : 0;

    const currentSum = value1 + value2 + rest;

    rest = Math.trunc(currentSum / 10);

    result = (currentSum % 10) + result;

    index1--;
    index2--;
  }

  return rest ? rest + result : result;
};

test(addStrings, [
  {
    input: ['11', '123'],
    expected: '134',
  },
  {
    input: ['456', '77'],
    expected: '533',
  },
  {
    input: ['0', '0'],
    expected: '0',
  },
]);
