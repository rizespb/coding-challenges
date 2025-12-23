# https://leetcode.com/problems/range-sum-of-bst/description/


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def rangeSumBST(self, root: TreeNode | None, low: int, high: int) -> int:
        total = 0

        if root is None:
            return total

        def inner(node) -> None:
            nonlocal total

            if low <= node.val <= high:
                total += node.val

            if node.val > low and node.left is not None:
                inner(node.left)

            if node.val < high and node.right is not None:
                inner(node.right)

        inner(root)

        return total
