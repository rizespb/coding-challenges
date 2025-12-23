# https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/
from typing import Union


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def lowestCommonAncestor(
        self, root: "TreeNode", node1: "TreeNode", node2: "TreeNode"
    ) -> Union["TreeNode", bool]:
        targets = [node1, node2]

        if not root or root in targets:
            return root

        def inner(node: "TreeNode") -> Union["TreeNode", bool]:
            is_target = node in targets

            left = node.left and inner(node.left)
            right = node.right and inner(node.right)

            # Если в левом и правом потомках есть по целевой ноде,
            # Значит текущая нода - искомая общая нода
            if left and right:
                return node

                # Если текущая нода является одной из целевых
            # То возвращаем node. Значит искомая общая нода где-то выше по дереву
            if is_target:
                return node

            # Если пока совпадений нет, то ищем общую ноду вначале в левом поддереве, затем - в правом
            return left or right

        return inner(root)
