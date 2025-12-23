// https://leetcode.com/problems/reverse-linked-list-ii/submissions/1621775704/

const reverseBetween = (head, left, right) => {
  if (!head || !head.next) return head;

  let current = head;

  let prev = null;

  let counter = 0;

  let leftNode;
  let rightNode;

  let prevNew;
  let nextNew;

  while (current) {
    counter++;

    if (counter === left) {
      leftNode = current;
      prevNew = prev;
    }

    if (counter === right) {
      rightNode = current;
      nextNew = current.next;

      break;
    }

    prev = current;
    current = current.next;
  }

  if (!leftNode || !rightNode) {
    return head;
  }

  let leftNext = nextNew;

  while (true) {
    const temp = leftNode.next;

    leftNode.next = leftNext;
    leftNext = leftNode;

    if (leftNode === rightNode) {
      break;
    }

    leftNode = temp;
  }

  if (prevNew) {
    prevNew.next = rightNode;
  } else {
    return rightNode;
  }

  return head;
};
