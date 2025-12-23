// https://leetcode.com/problems/reverse-nodes-in-k-group/description/

// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

// k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

// You may not alter the values in the list's nodes, only nodes themselves may be changed.

const reverseKGroup = (head, k) => {
  if (!head || !head.next || k === 1) return head;

  let newListNode;

  let newHead;

  let stack = [];

  let current = head;

  while (current) {
    for (let i = 0; i < k && current; i++) {
      stack.push(current);

      current = current.next;
    }

    if (stack.length < k) {
      newListNode.next = stack[0];
      return newHead;
    }

    while (stack.length > 0) {
      const node = stack.pop();

      if (!newHead) {
        newHead = node;
        newListNode = node;
      } else {
        newListNode.next = node;
        newListNode = newListNode.next;
      }
    }

    newListNode.next = null;
  }

  return newHead;
};
