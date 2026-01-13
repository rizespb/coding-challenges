# https://leetcode.com/problems/minimum-size-subarray-sum/description/

from test import test


#  Sliding  window approach
class Solution:
    def minSubArrayLen(self, target: int, nums: list[int]) -> int:
        left = 0

        min_length = 0

        current_sum = 0

        for index, value in enumerate(nums):
            if value >= target:
                return 1

            current_sum += value

            if current_sum < target:
                continue

            while current_sum >= target:
                current_sum -= nums[left]
                left += 1

            current_length = index - left + 2

            min_length = (
                current_length if min_length == 0 else min(min_length, current_length)
            )

        return min_length


solution = Solution()


test(
    solution.minSubArrayLen,
    [
        {
            "input": [7, [2, 3, 1, 2, 4, 3]],
            "expected": 2,
        },
        {
            "input": [11, [1, 2, 3, 4, 5]],
            "expected": 3,
        },
        {
            "input": [4, [1, 4, 4]],
            "expected": 1,
        },
        {
            "input": [11, [1, 1, 1, 1, 1, 1, 1, 1]],
            "expected": 0,
        },
    ],
)
