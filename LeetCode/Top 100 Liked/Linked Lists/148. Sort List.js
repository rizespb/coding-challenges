// https://leetcode.com/problems/sort-list/description/

// Given the head of a linked list, return the list after sorting it in ascending order.

var sortList = function (head) {
  if (!head) return head;

  let current = head;

  const arr = [];

  while (current) {
    arr.push({
      value: current.val,
      node: current,
    });

    current = current.next;
  }

  arr.sort((a, b) => a.value - b.value);

  const newHead = arr[0].node;

  let current2 = newHead;

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];

    current2.next = current.node;

    current2 = current.node;
  }

  current2.next = null;

  return newHead;
};
