// https://leetcode.com/problems/reverse-linked-list/description/

// Оба решения хорошие

// Решение 1
// const reverseList = (node, prev = null) => {
//   if (!node) return prev;

//   const temp = node.next;

//   node.next = prev;

//   return reverseList(temp, node);
// };

// Решение 2
const reverseList = (head) => {
  if (!head) return head;

  let current = head;

  let next = current.next;

  let prev = null;

  while (current && next) {
    const temp = next.next;

    next.next = current;

    current.next = prev;

    prev = current;

    current = next;

    next = temp;
  }

  return current;
};
