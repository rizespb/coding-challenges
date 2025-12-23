// https://leetcode.com/problems/maximize-distance-to-closest-person/description/

const { test } = require('../../test');

// Решение 1:
// const getDistance = (startIndex, endIndex, arr) => {
//   if (startIndex === 0 || endIndex === arr.length - 1) {
//     return endIndex - startIndex + 1;
//   }

//   const middleIndex = Math.floor((startIndex + endIndex) / 2);

//   return Math.min(middleIndex - startIndex, endIndex - middleIndex) + 1;
// };

// const maxDistToClosest = (arr) => {
//   let start = null;

//   let maxDistance = 0;

//   for (let i = 0; i < arr.length; i++) {
//     const current = arr[i];

//     const isZero = current === 0;

//     if (isZero && start === null) {
//       start = i;
//     }

//     if (isZero && arr[i + 1] !== 0) {
//       const currentDistance = getDistance(start, i, arr);

//       maxDistance = Math.max(currentDistance, maxDistance);

//       start = null;
//     }
//   }

//   return maxDistance;
// };

// Решение 2:
// За основу взят принцип:
// Получить длину максимальной последовательности из 0. Поделить на пополам с округлением в большую сторону (по условию задачу если между креслом Алекса и ближайшим соседом одном место, maxDistance считается равной 2).
// Если максимальная дистанция в начале или в конце ряда, то Алекс может занять место не по середине, а самое крайнее. Для этих случаев мы считаем, что maxDistance в два раза больше, чем количество нулей в подпоследовательности
const maxDistToClosest = function (arr) {
  let currentZeros = 0;
  let longestZeros = 0;

  let isStart = true;

  let index = 0;

  while (index < arr.length) {
    const current = arr[index];

    if (current === 1) {
      if (isStart) {
        longestZeros = currentZeros * 2;
      }

      isStart = false;
      currentZeros = 0;
      index++;

      continue;
    }

    currentZeros++;

    if (index === arr.length - 1) {
      currentZeros *= 2;
    }

    longestZeros = Math.max(longestZeros, currentZeros);
    index++;
  }

  return Math.round(longestZeros / 2);
};

test(maxDistToClosest, [
  {
    input: [[1, 0, 0, 0, 1, 0, 1]],
    expected: 2,
  },
  {
    input: [[1, 0, 0, 0]],
    expected: 3,
  },
]);
