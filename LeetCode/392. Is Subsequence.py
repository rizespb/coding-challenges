# https://leetcode.com/problems/is-subsequence/

from test import test


class Solution:
    def isSubsequence(
        self,
        substring: str,
        string: str,
    ) -> bool:
        stringLength = len(string)
        substringLength = len(substring)

        if substringLength == 0:
            return True

        if substringLength > stringLength:
            return False

        index = 0

        for char in string:
            if char == substring[index]:
                index += 1

            if index == substringLength:
                return True

        return index == substringLength


solution = Solution()


test(
    solution.isSubsequence,
    [
        {
            "input": ["abc", "ahbgdc"],
            "expected": True,
        },
        {"input": ["axc", "ahbgdc"], "expected": False},
        {
            "input": [
                "",
                "ahbgdc",
            ],
            "expected": True,
        },
    ],
)
