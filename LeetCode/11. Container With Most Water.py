# https://leetcode.com/problems/container-with-most-water/description/

from test import test


# (right - left) * min
class Solution:
    def maxArea(self, heights: list[int]) -> int:
        max_height = 0

        left = 0
        right = len(heights) - 1

        while left < right:
            current = (right - left) * min(heights[left], heights[right])

            max_height = max(current, max_height)

            if heights[left] < heights[right]:
                left += 1
            else:
                right -= 1

        return max_height


solution = Solution()


test(
    solution.maxArea,
    [
        {
            "input": [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
            "expected": 49,
        },
        {
            "input": [[1, 1]],
            "expected": 1,
        },
    ],
)
