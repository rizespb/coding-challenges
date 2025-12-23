# https://leetcode.com/problems/binary-tree-maximum-path-sum/description/


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxPathSum(self, root: TreeNode | None) -> int:
        max_path = float("-inf")

        def inner(node: TreeNode | None) -> int | float:
            nonlocal max_path

            if node is None:
                return float("-inf")

            left_max_path = inner(node.left)
            right_max_path = inner(node.right)

            #  Выбираем максимальный среди возможных путей в ноде:
            #  1. Сама нода без потомков
            #  2. Путь через ноду и левого потомка
            #  3. Путь через ноду и правого потомка
            through_node_max_path = max(
                node.val, node.val + left_max_path, node.val + right_max_path
            )

            # 4. Плюс путь из левого потомка через ноду в правого потомка (без захода выше в родителя)
            node_max_path = node.val + left_max_path + right_max_path

            max_path = max(max_path, through_node_max_path, node_max_path)

            return through_node_max_path

        inner(root)

        return 0 if isinstance(max_path, float) else max_path
