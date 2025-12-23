# https://leetcode.com/problems/perfect-squares/description/
from test import test


class Solution:
    def numSquares(self, num: int) -> int:
        squares: list[int] = []

        for index in range(1, num + 1):
            square = index * index

            if square <= num:
                squares.append(square)
            else:
                break

        squares.reverse()

        total = -1

        def inner(
            current_amount: int = 0,
            start_index: int = 0,
            current_sum: int = 0,
        ) -> None:
            nonlocal total

            if (total != -1 and current_amount >= total) or current_sum > num:
                return

            if current_sum == num:
                total = current_amount
                return

            for index in range(start_index, len(squares)):
                inner(current_amount + 1, index, current_sum + squares[index])

        inner()

        return total


solution = Solution()


test(
    solution.numSquares,
    [
        {
            "input": [12],
            "expected": 3,
        },
        {
            "input": [13],
            "expected": 2,
        },
        {
            "input": [1],
            "expected": 1,
        },
        {
            "input": [8935],
            "expected": 4,
        },
    ],
)
