// https://leetcode.com/problems/missing-number/description/
const { test } = require('../../test');

// Важно: в массиве nums n элементов
// По условию: в nums могут быть числа от 0 до n включительно
// То есть, максимальное значение равно длине nums
const missingNumber = (nums) => {
  // sum - сумма имеющихся элементов
  let sum = 0;

  // expectedSum - сумма всех элементов от 0 до n,
  // где n - это и верхняя граница диапазона, и количество элементов в nums
  let expectedSum = 0;

  let index = 0;
  for (index; index < nums.length; index++) {
    sum += nums[index];

    expectedSum += index;
  }

  // После цикла for в expectedSum хранится сумма всех элементов диапазона от 0 до n, кроме самого n
  // Поэтому добавляем n (длина nums равна n по условию)
  expectedSum += index;

  return expectedSum - sum;
};

test(missingNumber, [
  {
    input: [[3, 0, 1]],
    expected: 2,
  },
  {
    input: [[0, 1]],
    expected: 2,
  },
  {
    input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]],
    expected: 8,
  },
]);
