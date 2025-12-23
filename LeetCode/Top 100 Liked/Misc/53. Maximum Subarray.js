// https://leetcode.com/problems/maximum-subarray/description/

// Given an integer array nums, find the
// subarray
//  with the largest sum, and return its sum.

// O(n3) => O(n)
// Основная идея состоит в следующем:
// Получить сумму подмассива от n До k элемента можно путем вычитания из суммы элементов от 0 до k суммы элементов от 0 до n
// [..., n, ..., k, ...] =>
// Сумма элементов от n до k = сумма от 0 до k - сумма от 0 до n
const maxSubArray = (nums) => {
  const sums = [];

  let accumulatedSum = 0;

  // Считаем суммы подмассивов от 0 до текущего элемента i
  for (let i = 0; i < nums.length; i++) {
    accumulatedSum += nums[i];

    sums.push(accumulatedSum);
  }

  let minSum = 0;

  // Массив максимальных сумм подмассивов от 0 до текущего элемента
  let maxSums = [];

  for (let i = 0; i < sums.length; i++) {
    // Берем текущую сумму (сумма элементов от 0 до i)
    const current = sums[i];

    // Вычисляем максимальную сумму подмассива для текущего индекса
    let currentMax = current - minSum;

    // Сохраняем эту сумм в результирующий массив
    maxSums.push(currentMax);

    // Проверяем: возможно, текущая сумма стала минимальной на отрезке от 0 до i
    minSum = Math.min(minSum, current);
  }

  return Math.max(...maxSums);
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // [4,-1,2,1] => 6
console.log(maxSubArray([1])); // [1] => 1
console.log(maxSubArray([5, 4, -1, 7, 8])); // [5,4,-1,7,8] => 23
console.log(maxSubArray([-1])); // [-1] => -1
console.log(maxSubArray([-1, -2])); // [-1] => -1
console.log(maxSubArray([-2, 1])); // [1] => 1
console.log(maxSubArray([1, 2, -1, -2, 2, 1, -2, 1])); // 3
console.log(maxSubArray([1, 2, -1])); // 3
console.log(maxSubArray([0, -3, 1, 1])); // 2
