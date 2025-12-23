# https://leetcode.com/problems/longest-palindromic-substring/description/

from test import test


class Solution:
    def longestPalindrome(self, string: str) -> str:
        if not string:
            return ""

        start = 0
        max_length = 1

        for index in range(len(string)):
            current_length1 = self.check_substring(string, index, index + 1)
            current_length2 = self.check_substring(string, index, index + 2)

            current_max = max(current_length1, current_length2)

            if current_max <= max_length:
                continue

            max_length = current_max

            if current_length1 % 2 == 0:
                start = index - current_max // 2 + 1
            else:
                start = index - current_max // 2

        return string[start : start + max_length]

    def check_substring(self, s: str, left: int, right: int) -> int:
        palindrome_length = 0

        while left >= 0 and right < len(s) and s[left] == s[right]:
            palindrome_length = right - left + 1
            left -= 1
            right += 1

        return palindrome_length


solution = Solution()


test(
    solution.longestPalindrome,
    [
        {
            "input": ["babad"],
            "expected": "bab",
        },
        {
            "input": ["cbbd"],
            "expected": "bb",
        },
        {
            "input": ["aaaa"],
            "expected": "aaaa",
        },
        {
            "input": ["ccc"],
            "expected": "ccc",
        },
        {
            "input": ["c"],
            "expected": "c",
        },
    ],
)
