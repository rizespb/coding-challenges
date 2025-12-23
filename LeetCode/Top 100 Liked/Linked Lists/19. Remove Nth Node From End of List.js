// https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/

// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Нам надо удалить элемент списка с номером N с конца
const removeNthFromEnd = function (head, n) {
  let first = head;

  // first и second - это два указателя для двух последовательных проходов по списку
  // Вначале мы доходим до элемента списка с номером N от начала списка
  // Значит в списке осталось k элеметов:
  // k = общее количество элементов - n
  for (let i = 0; i < n; i++) {
    first = first.next;
  }

  // Если first равен null, значит мы добрались до конца списка, значит n равен длине списка и надо удалить head из списка
  if (!first) return head.next;

  // Идем по списку второй раз
  // Чтобы добраться до элемента N (который надо удалить),
  // нам надо перебрать k элементов от начала (k вычислили на предыдущем шаге)
  let second = head;

  // То есть мы переберем k элементов в тот момент, когда продолжим перебирать элементы first и доберемся до конца
  while (first.next) {
    first = first.next;
    second = second.next;
  }

  // Удлаяем N-ый элемент
  second.next = second.next.next;

  return head;
};
