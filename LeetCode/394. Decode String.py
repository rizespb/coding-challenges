# https://leetcode.com/problems/decode-string/description/

from test import test


class Solution:
    def decodeString(self, string: str) -> str:

        stack_str: list[str] = []
        stack_num: list[int] = []

        current = ""
        current_num = ""

        for char in string:

            if char.isdigit():
                current_num += char
            elif char == "[":
                stack_str.append(current)
                current = ""

                stack_num.append(int(current_num))
                current_num = ""
            elif char == "]":
                num = stack_num.pop()
                added_str = current * num

                current = stack_str.pop()
                current += added_str
            else:
                current += char

        return current


solution = Solution()


test(
    solution.decodeString,
    [
        {
            "input": ["3[a]2[bc]"],
            "expected": "aaabcbc",
        },
        {
            "input": ["3[a2[c2[b]]]"],
            "expected": "acbbcbbacbbcbbacbbcbb",
        },
        {
            "input": ["2[abc]3[cd]ef"],
            "expected": "abcabccdcdcdef",
        },
        {
            "input": ["100[leetcode]"],
            "expected": "leetcode" * 100,
        },
        {
            "input": ["3[z]2[2[y]pq4[2[jk]e1[f]]]ef"],
            "expected": "zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef",
        },
    ],
)
