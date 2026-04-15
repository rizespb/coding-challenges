# https://leetcode.com/problems/reverse-words-in-a-string/description/

from test import test

# Второе решение быстрее

# class Solution:
#     def reverseWords(self, string: str) -> str:
#         result = ""

#         current_word = ""

#         for index in range(len(string)):  # pylint: disable=consider-using-enumerate
#             char = string[index]

#             if char != " ":
#                 current_word += char

#                 if index != len(string) - 1:
#                     continue

#             if not current_word:
#                 continue

#             result = current_word + " " + result if result else current_word
#             current_word = ""

#         return result


class Solution:
    def reverseWords(self, string: str) -> str:
        return " ".join(reversed(list(filter(bool, string.split()))))


solution = Solution()

test(
    solution.reverseWords,
    [
        {
            "input": ["the sky is blue"],
            "expected": "blue is sky the",
        },
        {
            "input": ["  hello world  "],
            "expected": "world hello",
        },
        {
            "input": ["a good   example"],
            "expected": "example good a",
        },
    ],
)
