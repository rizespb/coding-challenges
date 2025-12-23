// https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/

const search = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const middleIndex = Math.floor((right + left) / 2);
    const middleEl = nums[middleIndex];

    if (middleEl === target) {
      return true;
    }

    if (middleEl === nums[left]) {
      left++;
      continue;
    }

    // Если левый элемент меньше опорного, значит опорный элемент находится в левой отсортированной части
    if (nums[left] <= middleEl) {
      if (target >= nums[left] && target < middleEl) {
        right = middleIndex - 1;
      } else {
        left = middleIndex + 1;
      }
      // В противном случае - в правой части (относительно точки разворота)
    } else {
      if (target > middleEl && target <= nums[right]) {
        left = middleIndex + 1;
      } else {
        right = middleIndex - 1;
      }
    }
  }

  return false;
};

// console.log(search([2, 5, 6, 0, 0, 1, 2], 0)); // true
// console.log(search([2, 5, 6, 0, 0, 1, 2], 3)); // false
console.log(search([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 2)); // true
