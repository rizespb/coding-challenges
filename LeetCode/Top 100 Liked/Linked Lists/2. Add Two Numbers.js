// https://leetcode.com/problems/add-two-numbers/description/

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

const getListFromArray = (arr) => {
  const root = new ListNode(arr[0]);

  let current = root;

  for (let i = 1; i < arr.length; i++) {
    const num = arr[i];

    current.next = new ListNode(num);

    current = current.next;
  }

  return root;
};

const getArrayFromList = (root) => {
  let result = [];

  let node = root;

  while (node) {
    result.push(node.val);

    node = node.next;
  }

  return result;
};

const addTwoNumbers = (l1, l2) => {
  const nums1 = getArrayFromList(l1);
  const nums2 = getArrayFromList(l2);

  let result = [];

  let index = 0;

  let carry = 0;

  while (index < nums1.length || index < nums2.length) {
    const num1 = Number(nums1[index]) || 0;
    const num2 = Number(nums2[index]) || 0;

    const sum = num1 + num2 + carry;

    carry = 0;

    if (sum >= 10) {
      carry = 1;
      result.push(sum - 10);
    } else {
      result.push(sum);
    }

    index++;
  }

  if (carry) {
    result.push(carry);
  }

  return getListFromArray(result);
};
