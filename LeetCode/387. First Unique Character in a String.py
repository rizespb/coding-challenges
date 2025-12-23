# https://leetcode.com/problems/first-unique-character-in-a-string/description/
from test import test


class Solution:
    def firstUniqChar(self, string: str) -> int:
        unique: set[str] = set()
        all_chars: set[str] = set()

        for char in string:
            if char in all_chars:
                unique.discard(char)
            else:
                unique.add(char)
                all_chars.add(char)

        if len(unique) != 0:
            for index, char in enumerate(string):
                if char in unique:
                    return index
        return -1


solution = Solution()


test(
    solution.firstUniqChar,
    [
        {
            "input": ["leetcode"],
            "expected": 0,
        },
        {
            "input": ["loveleetcode"],
            "expected": 2,
        },
        {
            "input": ["aabb"],
            "expected": -1,
        },
    ],
)
