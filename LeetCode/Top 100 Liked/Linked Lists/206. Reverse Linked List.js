// https://leetcode.com/problems/reverse-linked-list/description/

// Given the head of a singly linked list, reverse the list, and return the reversed list.

var reverseList = function (node, prev = null) {
  if (!node) return prev;

  const next = node.next;

  node.next = prev;

  return reverseList(next, node);
};
