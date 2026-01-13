# https://leetcode.com/problems/h-index/description/
from test import test


class Solution:
    def hIndex(self, citations: list[int]) -> int:
        citations.sort(reverse=True)

        for index, value in enumerate(citations):
            if value < index + 1:
                return index

        return len(citations)


solution = Solution()


test(
    solution.hIndex,
    [
        {
            "input": [[3, 0, 6, 1, 5]],
            "expected": 3,
        },
        {
            "input": [[1, 3, 1]],
            "expected": 1,
        },
        {
            "input": [[1]],
            "expected": 1,
        },
    ],
)
