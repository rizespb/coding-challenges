// https://leetcode.com/problems/continuous-subarray-sum/description/

const { test } = require('../test');

// Общая идея: в map сохраняем остатки от деления суммы элементов от 0 до i и соответствующие индексы элементов i
// Если в какой-то момент мы получаем остаток от деления, который уже есть в map,
// значит последовательность элементов от i+1 до текущего элементам делится без остатка
// Например, последовательность 5 2 2 8 1 10 15 13, target 4
// 5 % 4 = 1 -> {1: 0}
// (5+2) % 4 = 3 -> {1: 0, 3: 1}
// (7+2) % 4 = 1 -> ключ 1 уже есть в map, значение по ключу 1 - это 0. Значит сумма элементов от элемента с индексом 1 (0+1) до текущего делится target без остатка

// В Python более оптимизированная версия
const checkSubarraySum = (nums, target) => {
  if (nums.length < 2) return false;
  if (target === 1) return true;

  const map = {
    // Для случая, когда нужная последовательность элементов начинается в 0 индекса
    // Например,  [23, 2, 4, 6, 6], 7 ---> нужная последовательность 23+2+4+6 = 35
    // при таком подходе при проверке остатка на элементе nums[3] получится 0, но в map не будет свойства {0: индекс}
    // Поэтому добавляем искусственно значение для
    0: '-1',
  };

  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % target === 0) {
      if (nums[i] === nums[i - 1] || nums[i - 1] === 0 || nums[i + 1] === 0) {
        return true;
      }

      continue;
    }

    sum += nums[i];

    const remainder = sum % target;

    if (i - map[remainder] >= 1) {
      return true;
    } else {
      map[sum % target] = i;
    }
  }

  return false;
};

test(checkSubarraySum, [
  {
    input: [[23, 2, 4, 6, 7], 6],
    expected: true, // [2, 4] = sum is 6 ---> 6 / 6 === 1 ---> 1 is integer
  },
  {
    input: [[23, 2, 6, 4, 7], 6],
    expected: true, // [23, 2, 6, 4, 7] = sum is 42 ---> 42 / 6 === 7 ---> 1 is integer
  },
  {
    input: [[23, 2, 6, 4, 7], 13],
    expected: false,
  },
  {
    input: [[23, 2, 4, 6, 6], 7],
    expected: true,
  },
  {
    input: [[1, 0], 2],
    expected: false,
  },
  {
    input: [[5, 0, 0, 0], 3],
    expected: true,
  },
  {
    input: [[1, 2, 12], 6],
    expected: false,
  },
  {
    input: [[0, 1, 0], 1],
    expected: true,
  },
]);
