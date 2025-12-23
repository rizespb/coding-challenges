# https://leetcode.com/problems/maximal-rectangle/description/

from test import test


class Solution:
    def maximalRectangle(self, matrix: list[list[str]]) -> int | float:
        dp = [0] * len(matrix[0])

        max_area: int | float = 0

        for row in matrix:
            for index, item in enumerate(row):
                dp[index] = 0 if item == "0" else dp[index] + 1

            for x in range(len(dp)):
                if dp[x] == 0:
                    continue

                current_min: float | int = float("+inf")

                for y in range(x, len(dp)):
                    if dp[y] == 0:
                        break

                    current_min = min(current_min, dp[y])

                    max_area = max(max_area, (y - x + 1) * current_min)

        return max_area


solution = Solution()


test(
    solution.maximalRectangle,
    [
        {
            "input": [
                [
                    ["1", "0", "1", "0", "0"],
                    ["1", "0", "1", "1", "1"],
                    ["1", "1", "1", "1", "1"],
                    ["1", "0", "0", "1", "0"],
                ],
            ],
            "expected": 6,
        },
        {
            "input": [["0"]],
            "expected": 0,
        },
        {
            "input": [["1"]],
            "expected": 1,
        },
    ],
)
