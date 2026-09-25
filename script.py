from test import test


class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        dp = [1] * len(nums)

        max_subsequence = 1

        for index in range(1, len(nums)):
            for inner_index in range(0, index):
                if nums[index] > nums[inner_index]:
                    dp[index] = max(dp[index], dp[inner_index] + 1)

            max_subsequence = max(max_subsequence, dp[index])

        return max_subsequence


solution = Solution()


test(
    solution.lengthOfLIS,
    [
        {
            "input": [[10, 9, 2, 5, 3, 7, 101, 18]],
            "expected": 4,
        },
        {
            "input": [[0, 1, 0, 3, 2, 3]],
            "expected": 4,
        },
        {
            "input": [[7, 7, 7, 7, 7, 7, 7]],
            "expected": 1,
        },
    ],
)
