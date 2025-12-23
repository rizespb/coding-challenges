# https://leetcode.com/problems/missing-number/description/
from test import test


#  Важно: в массиве nums n элементов
#  По условию: в nums могут быть числа от 0 до n включительно
#  То есть, максимальное значение равно длине nums
class Solution:
    def missingNumber(self, nums: list[int]) -> int:
        current_sum = 0

        expected_sum = sum(range(len(nums) + 1))

        for value in nums:
            current_sum += value

        return expected_sum - current_sum


solution = Solution()


test(
    solution.missingNumber,
    [
        {
            "input": [[3, 0, 1]],
            "expected": 2,
        },
        {
            "input": [[0, 1]],
            "expected": 2,
        },
        {
            "input": [[9, 6, 4, 2, 3, 5, 7, 0, 1]],
            "expected": 8,
        },
    ],
)
