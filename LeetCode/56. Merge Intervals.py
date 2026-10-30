# https://leetcode.com/problems/merge-intervals/description/

from test import test


class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda item: item[0])

        result: list[list[int]] = []

        start = intervals[0][0]
        end = intervals[0][1]

        index = 1

        while index < len(intervals):
            current_start, current_end = intervals[index]

            if current_start > end:
                result.append([start, end])

                start = current_start
                end = current_end

                index += 1

                continue

            end = max(end, current_end)

            index += 1

        result.append([start, end])

        return result


solution = Solution()


test(
    solution.merge,
    [
        {
            "input": [
                [
                    [1, 3],
                    [2, 6],
                    [8, 10],
                    [15, 18],
                ],
            ],
            "expected": [
                [1, 6],
                [8, 10],
                [15, 18],
            ],
        },
        {
            "input": [
                [
                    [1, 4],
                    [4, 5],
                ],
            ],
            "expected": [[1, 5]],
        },
        {
            "input": [
                [
                    [4, 7],
                    [1, 4],
                ],
            ],
            "expected": [[1, 7]],
        },
    ],
)
