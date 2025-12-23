// https://leetcode.com/problems/swap-nodes-in-pairs/description/

// Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

const swapPairs = (head) => {
  if (!head || !head.next) return head;

  let current = head;
  let prev = null;

  let result = null;

  while (current && current.next) {
    const first = current;
    const second = current.next;
    const third = current.next.next;

    if (prev) {
      prev.next = second;
    }

    second.next = first;
    first.next = third;

    current = third;
    prev = first;

    if (!result) {
      result = second;
    }
  }

  return result;
};
