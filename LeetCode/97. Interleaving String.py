# https://leetcode.com/problems/interleaving-string/description/

from test import test


class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        length1, length2, length3 = map(len, (s1, s2, s3))

        if length1 + length2 != length3:
            return False

        dp = [[False] * (length2 + 1) for _ in range(length1 + 1)]

        dp[0][0] = True

        for index in range(1, length1 + 1):
            dp[index][0] = dp[index - 1][0] and s1[index - 1] == s3[index - 1]

        for index in range(1, length2 + 1):
            dp[0][index] = dp[0][index - 1] and s2[index - 1] == s3[index - 1]

        for row in range(1, length1 + 1):
            for column in range(1, length2 + 1):

                is_s1_char_valid = (
                    dp[row - 1][column] and s1[row - 1] == s3[row + column - 1]
                )

                is_s2_char_valid = (
                    dp[row][column - 1] and s2[column - 1] == s3[row + column - 1]
                )

                dp[row][column] = is_s1_char_valid or is_s2_char_valid

        return dp[length1][length2]


solution = Solution()

test(
    solution.isInterleave,
    [
        {
            "input": ["aabc", "dbbca", "aadbbcbca"],
            "expected": True,
        },
        {
            "input": ["aabcc", "dbbca", "aadbbbaccc"],
            "expected": False,
        },
        {
            "input": ["", "", ""],
            "expected": True,
        },
        {
            "input": [
                "bbbbbabbbbabaababaaaabbababbaaabbabbaaabaaaaababbbababbbbbabbbbababbabaabababbbaabababababbbaaababaa",
                "babaaaabbababbbabbbbaabaabbaabbbbaabaaabaababaaaabaaabbaaabaaaabaabaabbbbbbbbbbbabaaabbababbabbabaab",
                "babbbabbbaaabbababbbbababaabbabaabaaabbbbabbbaaabbbaaaaabbbbaabbaaabababbaaaaaabababbababaababbababbbababbbbaaaabaabbabbaaaaabbabbaaaabbbaabaaabaababaababbaaabbbbbabbbbaabbabaabbbbabaaabbababbabbabbab",
            ],
            "expected": False,
        },
    ],
)
