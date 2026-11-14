// https://leetcode.com/problems/maximum-units-on-a-truck/description/

const { test } = require('../test');

const maximumUnits = (boxTypes, truckSize) => {
  boxTypes.sort((a, b) => b[1] - a[1]);

  let restSize = truckSize;

  let totalUnits = 0;

  let index = 0;

  while (restSize > 0 && index < boxTypes.length) {
    const [boxCount, unitsPerBox] = boxTypes[index];

    const targetBoxCount = Math.min(boxCount, restSize);

    totalUnits += targetBoxCount * unitsPerBox;

    restSize -= targetBoxCount;
    index++;
  }

  return totalUnits;
};

test(maximumUnits, [
  {
    input: [
      [
        [1, 3],
        [2, 2],
        [3, 1],
      ],
      4,
    ],
    expected: 8,
  },
  {
    input: [
      [
        [5, 10],
        [2, 5],
        [4, 7],
        [3, 9],
      ],
      10,
    ],
    expected: 91,
  },
]);
