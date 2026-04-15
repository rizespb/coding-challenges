# https://leetcode.com/problems/max-points-on-a-line/description/

from test import test


class Solution:
    def maxPoints(self, points: list[tuple[int, int]]) -> int:
        length = len(points)

        if length <= 2:
            return length

        max_points = 0

        for i in range(length - 1):
            x1, y1 = points[i]

            for k in range(i + 1, length):
                x2, y2 = points[k]

                count = 2

                for j in range(k + 1, length):
                    x3, y3 = points[j]

                    # Проверить, что точки не являются треугольником
                    # (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1) = 0
                    if (x2 - x1) * (y3 - y1) == (y2 - y1) * (x3 - x1):
                        count += 1

                max_points = max(max_points, count)

        return max_points


solution = Solution()

test(
    solution.maxPoints,
    [
        {
            "input": [
                [
                    [1, 1],
                    [2, 2],
                    [3, 3],
                ],
            ],
            "expected": 3,
        },
        {
            "input": [
                [
                    [1, 1],
                    [3, 2],
                    [5, 3],
                    [4, 1],
                    [2, 3],
                    [1, 4],
                ],
            ],
            "expected": 4,
        },
        {
            "input": [
                [
                    [4, 5],
                    [4, -1],
                    [4, 0],
                ]
            ],
            "expected": 3,
        },
        {
            "input": [
                [
                    [-6, -1],
                    [3, 1],
                    [12, 3],
                ],
            ],
            "expected": 3,
        },
    ],
)
