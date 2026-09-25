# https://leetcode.com/problems/binary-tree-level-order-traversal/


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def levelOrder(self, root: TreeNode | None) -> list[list[int]]:
        if root is None:
            return []

        result: list[list[int]] = []

        stack: list[TreeNode] = [root]
        new_stack: list[TreeNode] = []

        nums: list[int] = []

        while len(stack) != 0:
            current = stack.pop()

            nums.append(current.val)

            if current.left:
                new_stack.append(current.left)

            if current.right:
                new_stack.append(current.right)

            if len(stack) == 0:
                new_stack.reverse()
                stack = new_stack
                new_stack = []

                result.append(nums)
                nums = []

        return result
