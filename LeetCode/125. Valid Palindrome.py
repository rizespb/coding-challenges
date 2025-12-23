# https://leetcode.com/problems/valid-palindrome/description/


class Solution:
    def isPalindrome(self, input: str) -> int:
        serialized = "".join(
            [value for value in input if value.isalpha() or value.isdigit()]
        ).lower()

        return serialized == serialized[::-1]
