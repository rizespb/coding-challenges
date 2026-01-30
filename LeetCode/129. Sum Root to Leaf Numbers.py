# https://leetcode.com/problems/sum-root-to-leaf-numbers/description/


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def sumNumbers(self, node: TreeNode | None, current_sum: str = "") -> int:
        if node is None:
            return 0

        if node.left is None and node.right is None:
            return int(current_sum + str(node.val))

        return self.sumNumbers(
            node.left, current_sum + str(node.val)
        ) + self.sumNumbers(node.right, current_sum + str(node.val))
