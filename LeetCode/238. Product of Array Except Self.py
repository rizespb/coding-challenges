# https://leetcode.com/problems/product-of-array-except-self/description/

from test import test


class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        length = len(nums)

        output = [1] * length

        acc = 1
        for index in range(length):
            output[index] = nums[index] * acc
            acc = output[index]

        result = [1] * length

        acc = 1
        for index in range(length - 1, -1, -1):
            product = acc * output[index - 1] if index > 0 else acc

            result[index] = product

            acc *= nums[index]

        return result


solution = Solution()


test(
    solution.productExceptSelf,
    [
        {
            "input": [[1, 2, 3, 4]],
            "expected": [24, 12, 8, 6],
        },
        {
            "input": [[-1, 1, 0, -3, 3]],
            "expected": [0, 0, 9, 0, 0],
        },
    ],
)
