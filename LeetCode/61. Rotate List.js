// https://leetcode.com/problems/rotate-list/description/

const rotateRight = (head, k) => {
  const map = {};

  let next = head;

  let count = 0;

  while (next) {
    count++;
    map[count] = next;

    next = next.next;
  }

  let rest = k % count;

  if (rest === 0) {
    return head;
  }

  for (let i = count; i > count - rest; i--) {
    const node = map[i];
    node.next = head;
    head = node;

    map[i - 1].next = null;
  }

  return head;
};
