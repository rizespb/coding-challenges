# https://leetcode.com/problems/symmetric-tree/description/


class Solution:
    def isSymmetric(self, root) -> bool:
        if not root:
            return True

        def is_equal(node1, node2) -> bool:
            if node1 is None or node2 is None:
                return node1 == node2

            if node1.val != node2.val:
                return False

            return is_equal(node1.left, node2.right) and is_equal(
                node1.right, node2.left
            )

        return is_equal(root.left, root.right)
