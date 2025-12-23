# https://leetcode.com/problems/add-strings/description/

from test import test


class Solution:
    def addStrings(self, num1: str, num2: str) -> str:
        result = ""

        index1 = len(num1) - 1
        index2 = len(num2) - 1

        rest = 0

        while index1 >= 0 or index2 >= 0:
            value1 = int(num1[index1]) if index1 >= 0 else 0
            value2 = int(num2[index2]) if index2 >= 0 else 0

            current_sum = value1 + value2 + rest

            rest = current_sum // 10

            result = str(current_sum % 10) + result

            index1 -= 1
            index2 -= 1

        return str(rest) + result if rest else result


solution = Solution()


test(
    solution.addStrings,
    [
        {
            "input": ["11", "123"],
            "expected": "134",
        },
        {
            "input": ["456", "77"],
            "expected": "533",
        },
        {
            "input": ["0", "0"],
            "expected": "0",
        },
    ],
)
