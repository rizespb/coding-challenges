// https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/description/

// Алгоритм основан на методе двух указателей
// Целевой элемент target - это максимальный элемент в массиве
// Текущее количество target элементов в подмассиве храним в переменной count
// Если в текущем подмассиве меньше k целевых элементов, то мы двигаем правый указатель right
// Если в подмассиве набралось нужное количество target элементов, то в общее количество подмассивов totalCount мы добавляем все подмассивы от индеса right и до конца массива
// [5, 1, 5, 2, 3] - когда левый индекс 0, а правый 2 - подмассив [5, 1, 5] - мы добавляем в totalCount все подмассивы до конца массива - [5, 1, 5], [5, 1, 5, 2], [5, 1, 5, 2, 3] - nums.length - right
// И двигаем левый указатель left
const countSubarrays = (nums, k) => {
  const target = Math.max(...nums);

  let total = nums.reduce((acc, item) => (item === target ? ++acc : acc), 0);

  if (total < k) {
    return 0;
  }

  let left = 0;
  let right = 0;

  let count = nums[left] === target ? 1 : 0;

  let totalCount = 0;

  while (left < nums.length && right < nums.length) {
    if (count >= k) {
      totalCount += nums.length - right;
    }

    if (count >= k) {
      nums[left] === target && count--;

      left++;
    } else {
      right++;

      nums[right] === target && count++;
    }
  }

  return totalCount;
};

countSubarrays([1, 3, 2, 3, 3], 2); // 6 - [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3]
countSubarrays([1, 4, 2, 1], 3); // 0
countSubarrays([21, 11, 13, 15, 16, 21, 8, 9, 6, 21], 2); // 10
countSubarrays(
  [
    73, 54, 15, 4, 23, 70, 53, 65, 73, 73, 2, 72, 36, 71, 73, 69, 35, 18, 62, 73, 62, 73, 73, 50, 30, 73, 20, 71, 60, 9,
    12, 57, 48, 73, 40, 20, 8, 73, 73, 73, 34, 59, 31, 49, 73, 5, 51, 36, 47, 38, 36, 58, 34, 42, 23, 28, 52, 73,
  ],
  1
); // 1537

// Решение не проходит тесты по времени
// const countSubarrays = (nums, k) => {
//   const maximum = Math.max(...nums);

//   let total = nums.reduce((acc, item) => (item === maximum ? ++acc : acc), 0);

//   if (total < k) {
//     console.log(0);

//     return 0;
//   }

//   let count = 0;

//   // let left = 0;
//   // let right = 0;

//   // // while (left < nums.length) {}h

//   for (let i = 0; i <= nums.length - k; i++) {
//     let currentCount = 0;

//     for (let n = i; n < nums.length; n++) {
//       if (nums[n] === maximum) {
//         currentCount++;
//       }

//       // Если набралось нужное количество целевых элементов, значит все последующие подмассивы содержат необходимое число целевых элементов
//       if (currentCount >= k) {
//         count += nums.length - n;
//         break;
//       }
//     }
//   }

//   console.log('count', count);

//   return count;
// };

// countSubarrays([1, 3, 2, 3, 3], 2); // 6 - [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3]
// countSubarrays([1, 4, 2, 1], 3); // 0
// countSubarrays([21, 11, 13, 15, 16, 21, 8, 9, 6, 21], 2); // 10
// countSubarrays(
//   [
//     73, 54, 15, 4, 23, 70, 53, 65, 73, 73, 2, 72, 36, 71, 73, 69, 35, 18, 62, 73, 62, 73, 73, 50, 30, 73, 20, 71, 60, 9,
//     12, 57, 48, 73, 40, 20, 8, 73, 73, 73, 34, 59, 31, 49, 73, 5, 51, 36, 47, 38, 36, 58, 34, 42, 23, 28, 52, 73,
//   ],
//   1
// ); // 1537
