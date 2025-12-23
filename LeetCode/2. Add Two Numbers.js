// https://leetcode.com/problems/add-two-numbers/description/

const addTwoNumbers = function (head1, head2) {
  let current1 = head1;
  let current2 = head2;

  let head = null;

  let tail = null;

  let rest = 0;

  while (current1 || current2) {
    const value1 = current1?.val || 0;
    const value2 = current2?.val || 0;

    const sum = value1 + value2 + rest;

    rest = sum >= 10 ? 1 : 0;

    const node = new ListNode(sum % 10);

    if (!head) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }

    current1 = current1?.next;
    current2 = current2?.next;
  }

  if (rest) {
    const node = new ListNode(rest);

    tail.next = node;
  }

  return head;
};
