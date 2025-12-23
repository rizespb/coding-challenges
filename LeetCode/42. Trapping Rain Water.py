# https://leetcode.com/problems/trapping-rain-water/description/
from test import test


class Solution:
    def trap(self, heights: list[int]) -> int:
        left = 0
        right = len(heights) - 1

        max_left = heights[left]
        max_right = heights[right]

        water = 0

        while left < right:
            if max_left < max_right:
                left += 1

                max_left = max(max_left, heights[left])

                water += max_left - heights[left]
            else:
                right -= 1

                max_right = max(max_right, heights[right])

                water += max_right - heights[right]

        return water


solution = Solution()


test(
    solution.trap,
    [
        {
            "input": [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
            "expected": 6,
        },
        {
            "input": [[4, 2, 0, 3, 2, 5]],
            "expected": 9,
        },
    ],
)
