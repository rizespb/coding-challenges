# https://leetcode.com/problems/longest-increasing-subsequence/description/

from test import test


class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        length = len(nums)

        dp: list[int] = [0] * length
        dp[length - 1] = 1

        for x in range(length - 1, -1, -1):
            current = nums[x]

            max_length = 1

            for y in range(x, length):
                if current < nums[y]:
                    possible_max_length = dp[y] + 1
                    max_length = max(max_length, possible_max_length)

            dp[x] = max_length

        return max(dp)


solution = Solution()


test(
    solution.lengthOfLIS,
    [
        {
            "input": [[10, 9, 2, 5, 3, 7, 101, 18]],
            "expected": 4,  # 2, 3, 7, 101
        },
        {
            "input": [[0, 1, 0, 3, 2, 3]],
            "expected": 4,  # 0, 1, 2, 3
        },
        {
            "input": [[7, 7, 7, 7, 7, 7, 7]],
            "expected": 1,  # 7
        },
    ],
)
