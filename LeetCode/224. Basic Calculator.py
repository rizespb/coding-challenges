# https://leetcode.com/problems/basic-calculator/submissions/1959687899

from test import test


class Solution:
    def calculate(self, string: str, start_index: int = 0) -> int | tuple[int, int]:
        result = 0
        sign = 1

        index = start_index
        length = len(string)

        while index < length:
            char = string[index]

            if char == " ":
                index += 1
                continue

            if char == "+":
                sign = 1

                index += 1
                continue

            if char == "-":
                sign = -1

                index += 1
                continue

            if char.isdigit():
                temp_value = ""

                while index < length and string[index].isdigit():
                    temp_value += string[index]
                    index += 1

                result += sign * int(temp_value)

                continue

            if char == "(":
                calculate_result = self.calculate(string, index + 1)
                if not isinstance(
                    calculate_result,
                    tuple,
                ):
                    raise ValueError

                brackets_result, end_index = calculate_result

                result += sign * brackets_result

                index = end_index + 1

                continue

            if char == ")":
                return result, index

        return result


solution = Solution()


test(
    solution.calculate,
    [
        {
            "input": ["11 + 1"],
            "expected": 12,
        },
        {
            "input": ["-11 + 1"],
            "expected": -10,
        },
        {
            "input": [" 2-1 + 2 "],
            "expected": 3,
        },
        {
            "input": ["4+5+2"],
            "expected": 11,
        },
        {
            "input": ["1+11-3"],
            "expected": 9,
        },
        {
            "input": ["(1+(4+5+2)-3)+(6+8)"],
            "expected": 23,
        },
    ],
)
