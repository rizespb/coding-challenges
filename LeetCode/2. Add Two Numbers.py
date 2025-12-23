# https://leetcode.com/problems/add-two-numbers/description/
from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(
        self, head1: Optional[ListNode], head2: Optional[ListNode]
    ) -> Optional[ListNode]:
        current1: ListNode | None = head1
        current2: ListNode | None = head2

        head: ListNode | None = None
        tail: ListNode | None = None

        rest = 0

        while current1 or current2:
            value1 = getattr(current1, "val", 0)
            value2 = getattr(current2, "val", 0)

            sum = value1 + value2 + rest

            node = ListNode(sum % 10)

            rest = 1 if sum >= 10 else 0

            if head is None or tail is None:
                head = node
                tail = node
            else:
                tail.next = node
                tail = node

            current1 = getattr(current1, "next", None)
            current2 = getattr(current2, "next", None)

        if rest and tail:
            node = ListNode(rest)
            tail.next = node

        return head
