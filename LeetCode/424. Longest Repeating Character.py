# https://leetcode.com/problems/longest-repeating-character-replacement/description/

from test import test


class Solution:
    def characterReplacement(self, string: str, k: int) -> int:
        chars_dict: dict[str, int] = {}

        left = 0
        right = 0

        window_max_freq = 0

        max_sub_str = 0

        while right < len(string):
            chars_dict[string[right]] = chars_dict.get(string[right], 0) + 1

            window_max_freq = max(window_max_freq, chars_dict[string[right]])

            if ((right - left + 1) - window_max_freq) > k:
                chars_dict[string[left]] -= 1
                left += 1

            max_sub_str = max(max_sub_str, right - left + 1)

            right += 1

        return max_sub_str


solution = Solution()


test(
    solution.characterReplacement,
    [
        {
            "input": ["ABAB", 2],
            "expected": 4,
        },
        {
            "input": ["AABABBA", 1],
            "expected": 4,
        },
        {
            "input": ["AABAABBBBBB", 2],
            "expected": 9,
        },
        {
            "input": ["ABBB", 2],
            "expected": 4,
        },
    ],
)
