# https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/
from typing import Optional


class Node:
    def __init__(
        self,
        val: int = 0,
        left: Optional["Node"] = None,
        right: Optional["Node"] = None,
        next: Optional["Node"] = None,
    ):
        self.val = val
        self.left = left
        self.right = right
        self.next = next


class Solution:
    def connect(self, root: Node) -> Node:
        if not root:
            return root

        stack = [root]

        while len(stack):
            length = len(stack)

            for index in range(length):
                current = stack.pop(0)

                if index < length - 1:
                    current.next = stack[0]

                if current.left:
                    stack.append(current.left)

                if current.right:
                    stack.append(current.right)

        return root
        return root
