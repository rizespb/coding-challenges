# https://leetcode.com/problems/validate-binary-search-tree/


class Solution:
    def isValidBST(self, root, max_value=float("inf"), min_value=float("-inf")) -> bool:
        if not root:
            return True

        value = root.val
        left = root.left
        right = root.right

        if value >= max_value or value <= min_value:
            return False

        return self.isValidBST(left, value, min_value) and self.isValidBST(
            right, max_value, value
        )
