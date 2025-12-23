// https://leetcode.com/problems/merge-two-sorted-lists/description/

const mergeTwoLists = function (head1, head2) {
  if (!head1 || !head2) {
    return head1 || head2;
  }

  let next1 = head1;
  let next2 = head2;

  let head;
  let next;

  while (next1 && next2) {
    if (!head) {
      if (next1.val < next2.val) {
        head = next1;
        next = next1;
        next1 = next1.next;
      } else {
        head = next2;
        next = next2;
        next2 = next2.next;
      }

      continue;
    }

    if (next1.val < next2.val) {
      next.next = next1;
      next1 = next1.next;
    } else {
      next.next = next2;
      next2 = next2.next;
    }

    next = next.next;
  }

  next.next = next1 || next2;

  return head;
};
