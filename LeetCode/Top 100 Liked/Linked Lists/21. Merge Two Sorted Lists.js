// https://leetcode.com/problems/merge-two-sorted-lists/description/

// You are given the heads of two sorted linked lists list1 and list2.

// Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

// Return the head of the merged linked list.

const mergeTwoLists = (list1, list2) => {
  if (!list1) return list2;
  if (!list2) return list1;

  let first = list1;
  let second = list2;

  let current;
  let mergedHead;

  if (first.val < second.val) {
    current = first;
    mergedHead = first;
    first = first.next;
  } else {
    current = second;
    mergedHead = second;
    second = second.next;
  }

  while (first && second) {
    if (first.val < second.val) {
      current.next = first;
      first = first.next;
    } else {
      current.next = second;
      second = second.next;
    }

    current = current.next;
  }

  if (first) {
    current.next = first;
  } else {
    current.next = second;
  }

  return mergedHead;
};
