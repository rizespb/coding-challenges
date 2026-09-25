# https://leetcode.com/problems/house-robber/description/
from test import test


class Solution:
    def rob(self, nums: list[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        dp: list[int] = [0] * len(nums)

        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])

        for index in range(2, len(nums)):
            dp[index] = max(dp[index - 1], dp[index - 2] + nums[index])

        return dp[-1]


solution = Solution()


test(
    solution.rob,
    [
        {
            "input": [[1, 2, 3, 1]],
            "expected": 4,
        },
        {
            "input": [[2, 7, 9, 3, 1]],
            "expected": 12,
        },
    ],
)
