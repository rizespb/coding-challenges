# https://leetcode.com/problems/find-all-anagrams-in-a-string/description/
from test import test


class Solution:
    def findAnagrams(self, string: str, word: str) -> list[int]:
        result: list[int] = []

        chars_dict: dict[str, int] = {}

        total = len(word)

        for char in word:
            chars_dict[char] = chars_dict.get(char, 0) + 1

        left = 0
        right = 0

        current_amount = 0

        while right < len(string):
            right_char = string[right]
            left_char = string[left]

            if right_char in chars_dict and chars_dict[right_char] > 0:
                chars_dict[right_char] -= 1
                current_amount += 1

                if current_amount == total:
                    result.append(left)
                    chars_dict[left_char] += 1
                    current_amount -= 1
                    left += 1

                right += 1
                continue

            if right_char in chars_dict and chars_dict[right_char] == 0:
                chars_dict[left_char] += 1
                current_amount -= 1
                left += 1
                continue

            right += 1

            while left < right:
                if string[left] in chars_dict:
                    chars_dict[string[left]] += 1
                    current_amount -= 1

                left += 1

        return result


solution = Solution()


test(
    solution.findAnagrams,
    [
        {
            "input": ["cbaebabacd", "abc"],
            "expected": [0, 6],
        },
        {
            "input": ["abab", "ab"],
            "expected": [0, 1, 2],
        },
        {
            "input": ["baa", "aa"],
            "expected": [1],
        },
    ],
)
