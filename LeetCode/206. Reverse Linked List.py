# https://leetcode.com/problems/reverse-linked-list/description/

# Оба решения хорошие

# Решение 1
# class Solution:
#     def reverseList(self, head, prev=None):
#         if not head:
#             return prev

#         temp = head.next

#         head.next = prev

#         return self.reverseList(temp, head)


# Решение 2
class Solution:
    def reverseList(self, node):
        if not node:
            return node

        current_node = node
        next_node = node.next

        prev_node = None

        while current_node and next_node:
            temp_next_node = next_node.next

            next_node.next = current_node
            current_node.next = prev_node

            prev_node = current_node

            current_node = next_node

            next_node = temp_next_node

        return current_node


solution = Solution()
