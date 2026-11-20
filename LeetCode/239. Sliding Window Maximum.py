# https://leetcode.com/problems/sliding-window-maximum/description/

from test import test
from collections import deque


class MonotonicQueue:
    def __init__(self):
        self.queue = deque()

    def popLeft(self):
        return self.queue.popleft()

    def append(self, index: int, nums: list[int]) -> None:
        while self.queue and nums[self.queue[-1]] <= nums[index]:
            self.queue.pop()
        self.queue.append(index)

    def get_max_index(
        self,
    ) -> int:
        return self.queue[0]


class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        result: list[int] = []
        left = 0
        right = 0
        queue = MonotonicQueue()
        while right < len(nums):
            queue.append(right, nums)
            if right < k - 1:
                right += 1
                continue
            result.append(nums[queue.get_max_index()])
            right += 1
            if left == queue.get_max_index():
                queue.popLeft()
            left += 1
        return result


solution = Solution()


test(
    solution.maxSlidingWindow,
    [
        {
            "input": [[1, 3, -1, -3, 5, 3, 6, 7], 3],
            "expected": [3, 3, 5, 5, 6, 7],
        },
        {
            "input": [[1], 1],
            "expected": [1],
        },
    ],
)
