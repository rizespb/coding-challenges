// https://leetcode.com/problems/trapping-rain-water/description/

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

// При решении задачи мы отталкиваемся от двух идей:
// 1. Крайний левый элемент и крайний правый не могут содержать воду
// 2. Остальные элементы могут содержать воду, если они меньше как минимум правой и левой границы
//
// По ходу решения мы сдвигаем эти границы в направлении центра, если встречам более высокий столбец, чем уже есть
const trap = (height) => {
  let left = 0;
  let right = height.length - 1;
  let maxLeft = height[0];
  let maxRight = height[height.length - 1];

  let water = 0;

  while (left < right) {
    // Если левая граница ниже правой, то ровняемся по левому краю и двигаемся от левого края к правому
    if (maxLeft < maxRight) {
      left++;

      const leftEl = height[left];

      maxLeft = Math.max(leftEl, maxLeft);

      water += maxLeft - leftEl;

      // В противном случае, ровняемся по правому краю и перемещаемся справа налево
    } else {
      right--;

      const rightEl = height[right];

      maxRight = Math.max(rightEl, maxRight);

      water += maxRight - rightEl;
    }
  }

  return water;
};

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5])); // 9
