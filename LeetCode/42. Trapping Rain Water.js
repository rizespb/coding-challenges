// https://leetcode.com/problems/trapping-rain-water/description/
const { test } = require('./test');

// При решении задачи мы оттталкиваемся от двух идей:
// 1. Крайний левый элемент и крайний правый не могут содержать воду
// 2. Остальные элементы могут содержать воду, если они меньше как минимум правой и левой границы
//
// По ходу решения мы сдвигаем эти границы в направлении центра, если встречам более высокий столбец, чем уже есть
const trap = (heights) => {
  let left = 0;
  let right = heights.length - 1;

  let maxLeft = heights[left];
  let maxRight = heights[right];

  let result = 0;

  while (left < right) {
    // Если левая граница ниже правой, то ровняемся по левому краю и двигаемся от левого края к правому
    if (maxLeft < maxRight) {
      left++;

      const leftEl = heights[left];
      maxLeft = Math.max(maxLeft, leftEl);

      result += maxLeft - leftEl;
      // В противном случае, ровняемся по правому краю и перемещаемся справа налево
    } else {
      right--;

      const rightEl = heights[right];
      maxRight = Math.max(maxRight, rightEl);

      result += maxRight - rightEl;
    }
  }

  return result;
};

test(trap, [
  {
    input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
    expected: 6,
  },
  {
    input: [[4, 2, 0, 3, 2, 5]],
    expected: 9,
  },
]);
