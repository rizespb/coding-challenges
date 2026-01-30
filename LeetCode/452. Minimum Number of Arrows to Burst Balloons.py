# https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/
from test import test


class Solution:
    def findMinArrowShots(self, points: list[list[int]]) -> int:
        points.sort(key=lambda a: a[0])

        count: int = 0

        tail: int | float = float("-inf")

        for point in points:
            start, end = point

            if start <= tail:
                tail = min(tail, end)
                continue

            count += 1
            tail = end

        return count


solution = Solution()


test(
    solution.findMinArrowShots,
    [
        {
            "input": [
                [
                    [10, 16],
                    [2, 8],
                    [1, 6],
                    [7, 12],
                ],
            ],
            "expected": 2,
        },
        {
            "input": [
                [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                    [7, 8],
                ],
            ],
            "expected": 4,
        },
        {
            "input": [
                [
                    [1, 2],
                    [2, 3],
                    [3, 4],
                    [4, 5],
                ]
            ],
            "expected": 2,
        },
        {
            "input": [
                [
                    [3, 9],
                    [7, 12],
                    [3, 8],
                    [6, 8],
                    [9, 10],
                    [2, 9],
                    [0, 9],
                    [3, 9],
                    [0, 6],
                    [2, 8],
                ],
            ],
            "expected": 2,
        },
    ],
)
