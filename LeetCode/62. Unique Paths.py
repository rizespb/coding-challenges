# https://leetcode.com/problems/unique-paths/description/

from test import test


class Solution:
    def uniquePaths(self, height: int, width: int) -> int:
        dp = [1] * width

        for _ in range(1, height):
            for index in range(1, width):
                dp[index] = dp[index] + dp[index - 1]

        return dp[-1]


solution = Solution()


test(
    solution.uniquePaths,
    [
        {
            "input": [3, 7],
            "expected": 28,
        },
        {
            "input": [3, 2],
            "expected": 3,
        },
    ],
)
