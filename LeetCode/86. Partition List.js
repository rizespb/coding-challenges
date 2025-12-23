// https://leetcode.com/problems/partition-list/description/

const partition = (head, x) => {
  const headingArr = [];
  const tailArr = [];

  let current = head;

  while (current) {
    if (current.val < x) {
      headingArr.push(current);
    } else {
      tailArr.push(current);
    }

    current = current.next;
  }

  if (!headingArr.length) {
    return head;
  }

  const arr = headingArr.concat(tailArr);

  for (let i = 0; i < arr.length; i++) {
    arr[i].next = arr[i + 1] || null;
  }

  return arr[0];
};
