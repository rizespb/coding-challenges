# https://leetcode.com/problems/binary-search-tree-iterator/description/


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class BSTIterator:
    def __init__(self, root: TreeNode | None) -> None:
        self.stack: list[TreeNode] = []
        self.traverseLeft(root)

    def next(self) -> int:
        current = self.stack.pop()

        self.traverseLeft(current.right)

        return current.val

    def hasNext(self) -> bool:
        return len(self.stack) > 0

    def traverseLeft(self, node: TreeNode | None) -> None:
        if node is None:
            return

        self.stack.append(node)

        self.traverseLeft(node.left)
