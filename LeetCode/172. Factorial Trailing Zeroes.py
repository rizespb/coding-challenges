# https://leetcode.com/problems/factorial-trailing-zeroes/description/

from test import test


class Solution:
    def trailingZeroes(self, n: int) -> int:
        count = 0

        while n >= 5:
            current = n // 5

            count += current
            n = current

        return count


solution = Solution()

test(
    solution.trailingZeroes,
    [
        {
            "input": [3],
            "expected": 0,
        },
        {
            "input": [5],
            "expected": 1,
        },
        {
            "input": [0],
            "expected": 0,
        },
        {
            "input": [30],
            "expected": 7,
        },
        {
            "input": [125],
            "expected": 31,
        },
    ],
)
