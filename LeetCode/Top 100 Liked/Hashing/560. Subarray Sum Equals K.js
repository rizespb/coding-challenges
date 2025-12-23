// https://leetcode.com/problems/subarray-sum-equals-k/description/

// Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

// A subarray is a contiguous non-empty sequence of elements within an array.

// Основной принцип:
// Сумму элементов от i до k можно посчитать как разницу сумм от 0 элемента до k и от 0 до i: sum[i...k] = sum[0...k] - sum[0...i]

const subarraySum = (nums, k) => {
  // Сумма всех элементов от 0 до i-го
  let sum = 0;

  let result = 0;

  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    // Если сумма от 0 элемента до текущего включительно равна k
    if (sum === k) {
      result++;
    }

    // Если раньше уже была сумма, которая в сумме с текущей суммой дает k
    if (map.has(sum - k)) {
      result += map.get(sum - k);
    }

    if (!map.has(sum)) {
      map.set(sum, 0);
    }

    // Увеличиваем счетчик того, сколько раз можно получить текущую сумму
    map.set(sum, map.get(sum) + 1);
  }

  return result;
};
