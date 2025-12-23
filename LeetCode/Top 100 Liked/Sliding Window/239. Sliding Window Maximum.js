// https://leetcode.com/problems/sliding-window-maximum/description/

// You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

// Return the max sliding window.

const maxSlidingWindow = (nums, size) => {
  const dequeue = [];
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];

    // Основной принцип при добалении в очередь - как только мы получаем новое число, мы можем избавиться от всех чисел в очереди, которые меньше текущего
    // Таким образом в начале очереди всегда будет максимальное на данный момент число и очередь будет отсортирована
    while (dequeue.length > 0 && current > dequeue[dequeue.length - 1]) {
      dequeue.pop();
    }

    dequeue.push(current);

    // Если не один из первых элементов массива nums, индекс которого меньше k-1 (т.е. первое окно еще не сформировано)
    if (i >= size - 1) {
      result.push(dequeue[0]);

      // Перед заходом на следующую итерацию, проверям:
      // Если элемент слева (i - size + 1), который на следующей итерации выйдет за пределы окна, является наибольшим, то удаляем его из очереди заранее
      if (nums[i - size + 1] === dequeue[0]) {
        dequeue.shift();
      }
    }
  }

  return result;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1)); // [1]
console.log(maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)); // [7, 7, 7, 7, 7]
console.log(maxSlidingWindow([1, -1], 1)); // [1, -1]

// Решение правильное, но не проходит тесты по времени
// Отсортированный связный список
// class SortedList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//   }

//   add(value) {
//     if (!this.head) {
//       const node = {
//         value,
//         next: null,
//       };

//       this.head = node;
//       this.tail = node;

//       return;
//     }

//     if (value > this.head.value) {
//       this.head = {
//         value,
//         next: this.head,
//       };

//       return;
//     }

//     const node = {
//       value,
//       next: null,
//     };

//     if (value < this.tail.value) {
//       this.tail.next = node;
//       this.tail = node;

//       return;
//     }

//     let current = this.head;

//     while (current.next && current.next.value > value) {
//       current = current.next;
//     }

//     node.next = current.next;
//     current.next = node;
//   }

//   remove(value) {
//     if (this.head.value === value) {
//       this.head = this.head.next;

//       return;
//     }

//     let current = this.head;

//     while (current.next) {
//       if (current.next.value !== value) {
//         current = current.next;
//         continue;
//       }

//       current.next = current.next.next;
//       break;
//     }
//   }
// }

// const maxSlidingWindow = (nums, size) => {
//   const arr = nums.slice(0, size);

//   const queue = new SortedList();

//   const result = [];

//   arr.forEach((value) => queue.add(value));

//   result.push(queue.head.value);

//   let right = size - 1;
//   let left = 0;

//   while (right < nums.length - 1) {
//     queue.remove(nums[left]);

//     left++;

//     right++;

//     queue.add(nums[right]);

//     result.push(queue.head.value);
//   }

//   return result;
// };
