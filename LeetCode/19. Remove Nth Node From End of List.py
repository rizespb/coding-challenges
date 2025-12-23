# https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


# Общий принцип за первый цикл перебираем num нод
# В этот момент в переменной first хранится нода под номером num от начала.
# То есть до конца списка осталось k = length - num элементов
#
# Во время второго цикла мы продолжаем перебирать список с ноды first.
# И параллельно используем второй указатель second.
# Когда first дойдет до конца списка (переберем еще k элементов до конца списка), указатель second пройдет k элементов от начала. И до конца списка останется length - k элементов. Как мы видим выше length - k = num. То есть в этот момент second будет указывать на ноду num c конца списка
class Solution:
    def removeNthFromEnd(self, head: ListNode, num: int) -> ListNode | None:
        first = head

        for _ in range(0, num):
            first = first.next

        # Если в переменной first оказался null, значит за первый цикл мы дошли до конца списка.
        # Значит num равен длине списка.
        # В таком случае надо удалить head из списка (т.к. head в таком случае как раз и будет num элементом с конца списка)
        if first is None:
            return head.next

        second = head

        while first.next is not None:
            first = first.next
            second = second.next

        second.next = second.next.next

        return head
