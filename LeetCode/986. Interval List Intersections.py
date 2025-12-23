# https://leetcode.com/problems/interval-list-intersections/description/
from test import test
from typing import List


class Solution:
    def intervalIntersection(
        self, list1: List[List[int]], list2: List[List[int]]
    ) -> List[List[int]]:
        result: List[List[int]] = []

        index1 = 0
        index2 = 0

        while all([index1 < len(list1), index2 < len(list2)]):
            start1, finish1 = list1[index1]
            start2, finish2 = list2[index2]

            if finish1 < start2:
                index1 += 1
                continue
            if finish2 < start1:
                index2 += 1
                continue

            pair = [max(start1, start2), min(finish1, finish2)]

            result.append(pair)

            if finish1 > finish2:
                index2 += 1
            else:
                index1 += 1

        return result


solution = Solution()


test(
    solution.intervalIntersection,
    [
        {
            "input": [
                [
                    [0, 2],
                    [5, 10],
                    [13, 23],
                    [24, 25],
                ],
                [
                    [1, 5],
                    [8, 12],
                    [15, 24],
                    [25, 26],
                ],
            ],
            "expected": [
                [1, 2],
                [5, 5],
                [8, 10],
                [15, 23],
                [24, 24],
                [25, 25],
            ],
        },
        {
            "input": [
                [
                    [1, 3],
                    [5, 9],
                ],
                [],
            ],
            "expected": [],
        },
    ],
)
