# https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/?envType=study-plan-v2&envId=top-interview-150


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def buildTree(self, inorder: list[int], postorder: list[int]) -> TreeNode | None:
        hash_dict: dict[int, int] = {}

        for index, value in enumerate(inorder):
            hash_dict[value] = index

        print(hash_dict)

        def inner(start: int, end: int) -> TreeNode | None:
            if len(postorder) == 0:
                return None

            if start > end:
                return None

            value = postorder.pop()
            node = TreeNode(value)

            node.right = inner(hash_dict[value] + 1, end)
            node.left = inner(start, hash_dict[value] - 1)

            return node

        return inner(0, len(inorder) - 1)
