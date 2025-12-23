# https://leetcode.com/problems/palindrome-linked-list/


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


# Объявляем два указателя
# Указатель fast движется в два раза быстрее slow
# Когда fast дойдет до конца, slow будет приблизительно посередине
# (в зависимости от того, четное или нечетное общее количества нод в списке)
# При этом параллельно мы разворачиваем список вслед за указателем slow
# Чтобы потом двигаться вправо и влево от цента и сравнивать значения в нодах
# Если в какой-то момент значения не совпали, значит не палиндром
class Solution:
    def isPalindrome(self, head: ListNode | None) -> bool:
        if head is None:
            return True

        slow = head
        fast = head

        prev_slow = None

        while fast.next and fast.next.next:
            fast = fast.next.next

            temp = slow.next
            slow.next = prev_slow
            prev_slow = slow
            slow = temp

        right = slow.next

        is_even = bool(fast.next)

        if is_even:
            left: ListNode | None = slow
            slow.next = prev_slow
        else:
            left = prev_slow

        while left and right:
            if left.val != right.val:
                return False

            left = left.next
            right = right.next

        return True
