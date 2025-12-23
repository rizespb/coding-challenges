# https://leetcode.com/problems/squares-of-a-sorted-array/
from test import test


class Solution:
    def sortedSquares(self, nums: list[int]) -> list[int]:
        length = len(nums)

        result = [0] * length

        left = 0
        right = length - 1

        currentIndex = length - 1

        while currentIndex >= 0:
            if abs(nums[left]) > abs(nums[right]):
                result[currentIndex] = nums[left] ** 2
                left += 1
            else:
                result[currentIndex] = nums[right] ** 2
                right -= 1

            currentIndex -= 1

        return result


solution = Solution()


test(
    solution.sortedSquares,
    [
        {
            "input": [[-4, -1, 0, 3, 10]],
            "expected": [0, 1, 9, 16, 100],
        },
        {"input": [[-7, -3, 2, 3, 11]], "expected": [4, 9, 9, 49, 121]},
        {
            "input": [[-1]],
            "expected": [1],
        },
        {
            "input": [[-10000, -9999, -7, -5, 0, 0, 10000]],
            "expected": [0, 0, 25, 49, 99980001, 100000000, 100000000],
        },
        {
            "input": [[-1, 2, 2]],
            "expected": [1, 4, 4],
        },
    ],
)
