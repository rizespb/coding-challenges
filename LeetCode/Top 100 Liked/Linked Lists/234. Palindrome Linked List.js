// https://leetcode.com/problems/palindrome-linked-list/description/

// Given the head of a singly linked list, return true if it is a
// palindrome
//  or false otherwise.

const checkIsPalindrome = function (str) {
  let left = 0;
  let right = str.length - 1;

  while (left <= right) {
    if (str[left] !== str[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
};

var isPalindrome = function (head) {
  let str = '';

  let current = head;

  while (current) {
    str += current.val;
    current = current.next;
  }

  return checkIsPalindrome(str);
};
