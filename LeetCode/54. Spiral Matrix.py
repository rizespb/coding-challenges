# https://leetcode.com/problems/spiral-matrix/description/

from test import test


class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        x_min = 0
        x_max = len(matrix[0]) - 1
        y_min = 0
        y_max = len(matrix) - 1

        result: list[int] = []

        while x_min <= x_max and y_min <= y_max:

            for x in range(x_min, x_max + 1):
                result.append(matrix[y_min][x])
            y_min += 1

            for y in range(y_min, y_max + 1):
                result.append(matrix[y][x_max])
            x_max -= 1

            if y_min <= y_max:
                for x in range(x_max, x_min - 1, -1):
                    result.append(matrix[y_max][x])
                y_max -= 1

            if x_min <= x_max:
                for y in range(y_max, y_min - 1, -1):
                    result.append(matrix[y][x_min])
                x_min += 1

            print({"x_min": x_min, "x_max": x_max, "y_min": y_min, "y_max": y_max})

        return result


solution = Solution()


test(
    solution.spiralOrder,
    [
        {
            "input": [
                [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                ],
            ],
            "expected": [1, 2, 3, 6, 9, 8, 7, 4, 5],
        },
        {
            "input": [
                [
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, 12],
                ],
            ],
            "expected": [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
        },
        {
            "input": [
                [
                    [1, 2, 3],
                    [4, 5, 6],
                ],
            ],
            "expected": [1, 2, 3, 6, 5, 4],
        },
    ],
)
