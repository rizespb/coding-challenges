# https://leetcode.com/problems/max-consecutive-ones-iii/description/

from test import test
from typing import List


class Solution:
    def longestOnes(self, nums: List[int], count: int) -> int:
        zeros_count = count

        left = 0
        right = 0

        current_count = 0
        max_count = 0

        while right < len(nums):
            value = nums[right]

            if value == 1 or zeros_count > 0:
                if value == 0:
                    zeros_count -= 1

                current_count += 1
                max_count = max(max_count, current_count)

                right += 1

                continue

            while zeros_count <= 0:
                if nums[left] == 0:
                    zeros_count += 1

                current_count -= 1
                left += 1

        return max_count


solution = Solution()


test(
    solution.longestOnes,
    [
        {
            "input": [[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2],
            "expected": 6,
        },
        {
            "input": [[0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3],
            "expected": 10,
        },
    ],
)
