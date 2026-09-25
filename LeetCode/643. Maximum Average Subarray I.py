from test import test


class Solution:
    def findMaxAverage(self, nums: list[int], k: int) -> float:
        current = sum(nums[:k])

        max_sum = current

        for index in range(k, len(nums)):
            current += nums[index] - nums[index - k]

            if current > max_sum:
                max_sum = current

        return max_sum / k


solution = Solution()


test(
    solution.findMaxAverage,
    [
        {
            "input": [[1, 12, -5, -6, 50, 3], 4],
            "expected": 12.75,
        },
        {
            "input": [[5], 1],
            "expected": 5,
        },
    ],
)
