# https://leetcode.com/problems/sort-characters-by-frequency/description/

from test import test


class Solution:
    def frequencySort(self, string: str) -> str:
        my_dict: dict[str, int] = {}

        for char in string:
            my_dict[char] = my_dict.get(char, 0) + 1

        sorted_pairs = sorted(my_dict.items(), key=lambda item: item[1], reverse=True)

        result = ""

        for char, freq in sorted_pairs:
            result += char * freq

        return result


solution = Solution()


test(
    solution.frequencySort,
    [
        {
            "input": ["trecec"],
            "expected": "eert",
        },
        {
            "input": ["cccaaa"],
            "expected": "aaaccc",
        },
        {
            "input": ["Aabb"],
            "expected": "bbAa",
        },
    ],
)
