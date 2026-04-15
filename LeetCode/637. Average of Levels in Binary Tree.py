# https://leetcode.com/problems/average-of-levels-in-binary-tree/description


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def averageOfLevels(self, root: TreeNode | None) -> list[float]:
        if not root:
            return []

        result: list[float] = []

        stack: list[TreeNode] = [root]

        while len(stack) != 0:

            current_row = stack
            stack = []

            current_sum: float = 0
            current_length = len(current_row)

            while len(current_row) != 0:
                current = current_row.pop()

                if current.left:
                    stack.append(current.left)

                if current.right:
                    stack.append(current.right)

                current_sum += current.val

            result.append(current_sum / current_length)

        return result
