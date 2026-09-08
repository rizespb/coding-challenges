# https://leetcode.com/problems/minimum-absolute-difference-in-bst/description/


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def getMinimumDifference(self, root: TreeNode | None) -> float:
        min_diff = float("inf")

        prev: TreeNode | None = None

        def dfs(node: TreeNode | None) -> None:
            if node is None:
                return

            dfs(node.left)

            nonlocal prev
            if prev is not None:
                nonlocal min_diff
                min_diff = min(min_diff, abs(prev.val - node.val))

            prev = node

            dfs(node.right)

        dfs(root)

        return min_diff
