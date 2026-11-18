from test import test
from collections import deque

# # https://leetcode.com/problems/sliding-window-maximum/description/
# class MonotonicQueue:
#     def __init__(self):
#         self.queue = deque()

#     def popLeft(self):
#         return self.queue.popleft()

#     def append(self, index: int, nums: list[int]) -> None:
#         while self.queue and nums[self.queue[-1]] <= nums[index]:
#             self.queue.pop()
#         self.queue.append(index)

#     def get_max_index(
#         self,
#     ) -> int:
#         return self.queue[0]


# class Solution:
#     def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
#         result: list[int] = []
#         left = 0
#         right = 0
#         queue = MonotonicQueue()
#         while right < len(nums):
#             queue.append(right, nums)
#             if right < k - 1:
#                 right += 1
#                 continue
#             result.append(nums[queue.get_max_index()])
#             right += 1
#             if left == queue.get_max_index():
#                 queue.popLeft()
#             left += 1
#         return result


class Solution:
    def maximumUnits(self, boxTypes: list[list[int]], truckSize: int) -> int:
        boxTypes.sort(key=lambda box: box[1], reverse=True)

        rest_boxes_size = truckSize

        total_units = 0

        index = 0
        while rest_boxes_size > 0:
            box = boxTypes[index]

            box_amount = min(rest_boxes_size, box[0])

            total_units += box_amount * box[1]
            rest_boxes_size -= box_amount
            index += 1

        return total_units


solution = Solution()


test(
    solution.maximumUnits,
    [
        {
            "input": [[[1, 3], [2, 2], [3, 1]], 4],
            "expected": 8,
        },
        {
            "input": [[[5, 10], [2, 5], [4, 7], [3, 9]], 10],
            "expected": 91,
        },
    ],
)
