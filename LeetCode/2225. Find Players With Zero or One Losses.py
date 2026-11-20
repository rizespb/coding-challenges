# https://leetcode.com/problems/find-players-with-zero-or-one-losses/description/
from test import test


class Solution:
    def findWinners(self, matches: list[list[int]]) -> list[list[int]]:
        wins: dict[int, int] = {}
        loses: dict[int, int] = {}

        for win, lose in matches:
            if wins.get(win) != -1:
                wins[win] = 1

            wins[lose] = -1

            loses[lose] = loses.get(lose, 0) + 1

        return [
            sorted([x for x in wins if wins[x] > 0]),
            sorted([x for x in loses if loses[x] == 1]),
        ]


solution = Solution()


test(
    solution.findWinners,
    [
        {
            "input": [
                [
                    [1, 3],
                    [2, 3],
                    [3, 6],
                    [5, 6],
                    [5, 7],
                    [4, 5],
                    [4, 8],
                    [4, 9],
                    [10, 4],
                    [10, 9],
                ],
            ],
            "expected": [
                [1, 2, 10],
                [4, 5, 7, 8],
            ],
        },
        {
            "input": [
                [
                    [2, 3],
                    [1, 3],
                    [5, 4],
                    [6, 4],
                ],
            ],
            "expected": [[1, 2, 5, 6], []],
        },
    ],
)
