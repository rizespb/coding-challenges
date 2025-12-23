# https://leetcode.com/problems/evaluate-reverse-polish-notation/description/
from test import test


class Solution:

    map = {
        "+": lambda a, b: a + b,
        "-": lambda a, b: a - b,
        "*": lambda a, b: a * b,
        "/": lambda a, b: int(a / b),
    }

    def evalRPN(self, tokens: list[str]) -> int:
        tokens.reverse()

        nums: list[int] = []

        while len(tokens):
            current = tokens.pop()

            if current not in self.map:
                nums.append(int(current))

                continue

            right = nums.pop()
            left = nums.pop()

            result = self.map[current](left, right)
            nums.append(result)

        return nums[0]


solution = Solution()


test(
    solution.evalRPN,
    [
        {
            "input": [["2", "1", "+", "3", "*"]],
            "expected": 9,
        },
        {
            "input": [["4", "13", "5", "/", "+"]],
            "expected": 6,
        },
        {
            "input": [
                ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
            ],
            "expected": 22,
        },
    ],
)
