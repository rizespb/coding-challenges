# https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
from test import test


class Solution:
    def findMin(self, nums: list[int]) -> int | float:
        min_value = float("inf")

        start = 0
        end = len(nums) - 1

        while start <= end:
            middle = (start + end) // 2

            min_value = min(min_value, nums[middle])

            if nums[middle] > nums[end]:
                start = middle + 1
            else:
                end = middle - 1

        return min_value


solution = Solution()


test(
    solution.findMin,
    [
        {
            "input": [[2, 3, 4, 5, 1]],
            "expected": 1,
        },
        {
            "input": [[3, 4, 5, 1, 2]],
            "expected": 1,
        },
        {
            "input": [[4, 5, 6, 7, 0, 1, 2]],
            "expected": 0,
        },
        {
            "input": [[11, 13, 15, 17]],
            "expected": 11,
        },
    ],
)
