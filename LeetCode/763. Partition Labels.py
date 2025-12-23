# https://leetcode.com/problems/partition-labels/description/

from test import test


class Solution:
    def partitionLabels(self, string: str) -> list[int]:
        last_char_index: dict[str, int] = {}

        for index, char in enumerate(string):
            last_char_index[char] = index

        result: list[int] = []

        last_largest_index = -1
        part = ""

        for index, char in enumerate(string):
            part += char

            last_largest_index = max(last_largest_index, last_char_index[char])

            if last_largest_index == index:
                result.append(len(part))

                part = ""

        return result


solution = Solution()


test(
    solution.partitionLabels,
    [
        {
            "input": ["ababcbacadefegdehijhklij"],
            "expected": [9, 7, 8],
        },
        {
            "input": ["eccbbbbdec"],
            "expected": [10],
        },
    ],
)
