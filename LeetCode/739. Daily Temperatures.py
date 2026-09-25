# https://leetcode.com/problems/daily-temperatures/description/

from test import test


class Solution:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:

        days: list[int] = [0] * len(temperatures)

        stack: list[int] = []

        for index, value in enumerate(temperatures):
            while stack and value > temperatures[stack[-1]]:
                i = stack.pop()
                days[i] = index - i

            stack.append(index)

        return days


solution = Solution()


test(
    solution.dailyTemperatures,
    [
        {
            "input": [[73, 74, 75, 71, 69, 72, 76, 73]],
            "expected": [1, 1, 4, 2, 1, 1, 0, 0],
        },
        {
            "input": [[30, 40, 50, 60]],
            "expected": [1, 1, 1, 0],
        },
        {
            "input": [[30, 60, 90]],
            "expected": [1, 1, 0],
        },
    ],
)
