# https://leetcode.com/problems/consecutive-characters/description/

from test import test


class Solution:
    def maxPower(self, string: str) -> int:
        counter = 0
        power = 0

        index = 0

        str_length = len(string)

        while index < str_length:
            if index == 0 or string[index] != string[index - 1]:
                counter = 1
            else:
                counter += 1

            power = max(power, counter)

            index += 1

        return power


solution = Solution()


test(
    solution.maxPower,
    [
        {
            "input": ["leetcode"],
            "expected": 2,
        },
        {
            "input": ["abbcccddddeeeeedcba"],
            "expected": 5,
        },
    ],
)
