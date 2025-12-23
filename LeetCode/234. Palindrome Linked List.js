// https://leetcode.com/problems/palindrome-linked-list/

// Объявляем два указателя
// Указатель fast движется в два раза быстрее slow
// Когда fast дойдет до конца, slow будет приблизительно посередине (в зависимости от того, четное или нечетное общее количества нод в списке)
// При этом параллельно мы разворачиваем список вслед за указателем slow
// Чтобы потом двигаться вправо и влево от цента и сравнивать значения в нодах
// Если в какой-то момент значения не совпали, значит не палиндром
const isPalindrome = (head) => {
  let slow = head;
  let fast = head;

  let prev = null;

  while (fast?.next?.next) {
    fast = fast.next.next;

    const prevSlow = slow;
    slow = slow.next;
    prevSlow.next = prev;
    prev = prevSlow;
  }

  const isEven = Boolean(fast.next);

  let right = slow.next;
  let left;

  if (isEven) {
    slow.next = prev;
    left = slow;
  } else {
    left = prev;
  }

  while (left) {
    if (left.val !== right.val) {
      return false;
    }

    left = left.next;
    right = right.next;
  }

  return true;
};
