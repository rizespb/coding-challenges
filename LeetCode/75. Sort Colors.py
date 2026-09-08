# https://leetcode.com/problems/sort-colors/description/

from test import test


class Solution:
    def sortColors(self, nums: list[int]) -> None:
        last_left = -1
        first_right = len(nums)

        index = 0

        while index < len(nums):
            value = nums[index]

            if value == 0:
                nums[index], nums[last_left + 1] = nums[last_left + 1], nums[index]
                last_left += 1
                index += 1
                continue

            if value == 2 and index < first_right:
                nums[index], nums[first_right - 1] = nums[first_right - 1], nums[index]
                first_right -= 1
                continue

            index += 1


solution = Solution()


test(
    solution.sortColors,
    [
        {
            "input": [[2, 0, 2, 1, 1, 0]],
            "expected": [0, 0, 1, 1, 2, 2],
        },
        {
            "input": [[2, 0, 1]],
            "expected": [0, 1, 2],
        },
        {
            "input": [[2, 0, 1]],
            "expected": [0, 1, 2],
        },
    ],
)
