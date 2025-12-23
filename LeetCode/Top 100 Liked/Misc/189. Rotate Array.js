// https://leetcode.com/problems/rotate-array/description/

// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

const rotate = (nums, k) => {
  if (k === 0) {
    return;
  }

  // Если k равно длинне массива, то после k перестановок мы получим исходный массив
  // В целях оптимизации для k > nums.length пропустим все "проходы по кругу" и выполним только оставшиеся операции, которые действительно меняют массив
  k = k % nums.length;

  // Разворачиваем массив
  nums.reverse();

  // Развернем подмассив из первых k элементов
  reverse(nums, 0, k - 1);

  // Развернем оставшуюся часть массива
  reverse(nums, k, nums.length - 1);
};

const reverse = (arr, start, end) => {
  while (start < end) {
    [arr[end], arr[start]] = [arr[start], arr[end]];
    start++;
    end--;
  }
};

console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)); // [5,6,7,1,2,3,4]
console.log(rotate([-1, -100, 3, 99], 2)); // [3,99,-1,-100]
