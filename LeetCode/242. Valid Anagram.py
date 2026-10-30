# https://leetcode.com/problems/valid-anagram/description/
from test import test


class Solution:
    def isAnagram(self, str1: str, str2: str) -> bool:
        if len(str1) != len(str2):
            return False

        chars_dict: dict[str, int] = {}

        for char in str1:
            chars_dict[char] = chars_dict.get(char, 0) + 1

        for char in str2:
            if char not in chars_dict or chars_dict[char] == 0:
                return False
            chars_dict[char] -= 1

        return True


solution = Solution()


test(
    solution.isAnagram,
    [
        {
            "input": ["anagram", "nagaram"],
            "expected": True,
        },
        {
            "input": ["rat", "car"],
            "expected": False,
        },
    ],
)
