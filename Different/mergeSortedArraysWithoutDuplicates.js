const { test } = require('./test');

// Даны два массива целых чисел. Массивы отсортированы по возрастанию. Вывести объединение без дублей, сохранив сортировку и использовав константу дополнительной памяти.
const mergeSortedArraysWithoutDuplicates = (arr1, arr2) => {
  const result = [];

  const length1 = arr1.length;
  const length2 = arr2.length;

  let first = 0;
  let second = 0;

  let last = null;

  while (first < length1 || second < length2) {
    if (second >= length2 || (first < length1 && arr1[first] < arr2[second])) {
      if (last === null || arr1[first] > last) {
        result.push(arr1[first]);
        last = arr1[first];
      }

      first++;

      continue;
    }

    if (last === null || arr2[second] > last) {
      result.push(arr2[second]);
      last = arr2[second];
    }

    second++;
  }

  return result.join('-');
};

test(mergeSortedArraysWithoutDuplicates, [
  {
    input: [
      [1, 3, 5, 7, 9],
      [2, 4, 6, 8],
    ],
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9].join('-'),
  },
  {
    input: [
      [2, 4, 6],
      [4, 6, 8],
    ],
    expected: [2, 4, 6, 8].join('-'),
  },
  {
    input: [[], [1, 2, 3]],
    expected: [1, 2, 3].join('-'),
  },
  {
    input: [[], []],
    expected: [].join('-'),
  },
  {
    input: [
      [1, 2, 3, 4, 5],
      [2, 3, 4],
    ],
    expected: [1, 2, 3, 4, 5].join('-'),
  },
  {
    input: [
      [2, 2, 2],
      [2, 2],
    ],
    expected: [2].join('-'),
  },
  {
    input: [
      [1, 2, 3, 4, 5, 6, 7],
      [2, 4, 6],
    ],
    expected: [1, 2, 3, 4, 5, 6, 7].join('-'),
  },
  {
    input: [
      [1, 2, 3],
      [3, 4, 5],
    ],
    expected: [1, 2, 3, 4, 5].join('-'),
  },
  {
    input: [
      [-5, -3, -1],
      [-4, -3, -2, -1, 0],
    ],
    expected: [-5, -4, -3, -2, -1, 0].join('-'),
  },
  {
    input: [
      [1, 1, 2, 2, 3],
      [2, 2, 3, 3, 4],
    ],
    expected: [1, 2, 3, 4].join('-'),
  },
  {
    input: [
      [1, 1, 1],
      [1, 1, 1, 1],
    ],
    expected: [1].join('-'),
  },
]);
