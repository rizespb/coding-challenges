# https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
from test import test

# Другой подход, отличный от JS
# Основан на двух указателях и том, что массив отсортирован


class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left = 0
        right = len(numbers) - 1

        while left < right:
            current_sum = numbers[left] + numbers[right]

            if current_sum == target:
                return [left + 1, right + 1]

            if current_sum > target:
                right -= 1

            if current_sum < target:
                left += 1

        return [-1, -1]


solution = Solution()


test(
    solution.twoSum,
    [
        {
            "input": [[2, 7, 11, 15], 9],
            "expected": [1, 2],
        },
        {
            "input": [[2, 3, 4], 6],
            "expected": [1, 3],
        },
        {
            "input": [[-1, 0], -1],
            "expected": [1, 2],
        },
    ],
)
