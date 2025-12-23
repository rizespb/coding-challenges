// https://leetcode.com/problems/merge-k-sorted-lists/description/

// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

// Merge all the linked-lists into one sorted linked-list and return it.

// Решение 1 (более быстрое):
// Создаем массивы из списков, объединяем эти массивы, сортируем получившийся массив и создаем из него связный список

// const createList = (arr) => {
//   if (arr.length === 0) return null;

//   const head = new ListNode(arr[0]);
//   let current = head;

//   for (let i = 1; i < arr.length; i++) {
//     current.next = new ListNode(arr[i]);
//     current = current.next;
//   }

//   return head;
// };

// const createArray = (head) => {
//   let result = [];

//   let current = head;

//   while (current) {
//     result.push(current.val);
//     current = current.next;
//   }

//   return result;
// };
// const mergeKLists = (arrays) => {
//   const concated = arrays.reduce((acc, current) => {
//     const currentArr = createArray(current);

//     return acc.concat(currentArr);
//   }, []);

//   concated.sort((a, b) => a - b);

//   return createList(concated);
// };

// Решение 2 (более медленное):
// На
const mergeKLists = (lists) => {
  let currents = Array.from(lists.map((list) => list)).filter(Boolean);

  if (currents.length === 0) return null;

  const findMinElementIndex = () => {
    let minIndex;

    for (let i = 0; i < currents.length; i++) {
      if (!currents[i]) continue;

      if (minIndex === undefined || currents[i].val < currents[minIndex].val) {
        minIndex = i;
      }
    }

    return minIndex;
  };

  let min = findMinElementIndex();

  let head = currents[min];
  let tail = currents[min];

  currents[min] = currents[min].next;

  min = findMinElementIndex();

  while (min !== undefined) {
    tail.next = currents[min];
    tail = tail.next;

    currents[min] = currents[min].next;
    min = findMinElementIndex();
  }

  return head;
};
