# https://leetcode.com/problems/valid-parentheses/description/
from functools import cached_property
from test import test
from typing import List


class Solution:
    my_dict = {
        "(": ")",
        "{": "}",
        "[": "]",
    }

    @cached_property
    def opens(self):
        return set(self.my_dict.keys())

    def isValid(self, s: str) -> bool:
        stack: List[str] = []

        for char in s:
            if char in self.opens:
                stack.append(char)
                continue

            if len(stack) == 0:
                return False

            last = stack.pop()

            if self.my_dict[last] != char:
                return False

        return len(stack) == 0


solution = Solution()


test(
    solution.isValid,
    [
        {
            "input": ["()"],
            "expected": True,
        },
        {
            "input": ["()[]{}"],
            "expected": True,
        },
        {
            "input": ["(]"],
            "expected": False,
        },
        {
            "input": ["([])"],
            "expected": True,
        },
        {
            "input": ["([)]"],
            "expected": False,
        },
    ],
)
