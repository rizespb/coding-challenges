# https://leetcode.com/problems/isomorphic-strings/description
from test import test


class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        chars_map: dict[str, str] = {}
        back_map: dict[str, str] = {}

        for index in range(len(s)):  # pylint: disable=consider-using-enumerate
            s_char = s[index]
            t_char = t[index]

            if s_char in chars_map and chars_map[s_char] != t_char:
                return False

            if t_char in back_map and back_map[t_char] != s_char:
                return False

            chars_map[s[index]] = t[index]
            back_map[t[index]] = s[index]

        return True


solution = Solution()


test(
    solution.isIsomorphic,
    [
        {
            "input": ["egg", "add"],
            "expected": True,
        },
        {
            "input": ["foo", "bar"],
            "expected": False,
        },
        {
            "input": ["paper", "title"],
            "expected": True,
        },
        {
            "input": ["badc", "baba"],
            "expected": False,
        },
    ],
)
