// https://leetcode.com/problems/intersection-of-two-linked-lists/

var getIntersectionNode = function (headA, headB) {
  const set = new Set();

  let current = headA;

  while (current) {
    set.add(current);

    current = current.next;
  }

  current = headB;

  while (current) {
    if (set.has(current)) {
      return current;
    }

    current = current.next;
  }

  return null;
};
