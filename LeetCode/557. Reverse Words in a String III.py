# https://leetcode.com/problems/reverse-words-in-a-string-iii/

from test import test


class Solution:
    # def reverseWords(self, text: str) -> str:
    #     return " ".join(map(lambda word: "".join(reversed(word)), text.split(" ")))
    def reverseWords(self, text: str) -> str:
        return " ".join(word[::-1] for word in text.split())


solution = Solution()


test(
    solution.reverseWords,
    [
        {
            "input": ["Let's take LeetCode contest"],
            "expected": "s'teL ekat edoCteeL tsetnoc",
        },
        {
            "input": ["Mr Ding"],
            "expected": "rM gniD",
        },
    ],
)
