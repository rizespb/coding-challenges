# https://leetcode.com/problems/permutations/description/

from test import test


class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        result: list[list[int]] = []

        nums_amount = len(nums)

        visited: list[bool] = [False] * nums_amount
        current_list: list[int] = []

        def inner() -> None:
            if len(current_list) == nums_amount:
                result.append(current_list.copy())

            for index in range(nums_amount):
                if visited[index]:
                    continue

                visited[index] = True
                current_list.append(nums[index])

                inner()

                visited[index] = False
                current_list.pop()

        inner()

        return result


solution = Solution()


test(
    solution.permute,
    [
        {
            "input": [[1, 2, 3]],
            "expected": [
                [1, 2, 3],
                [1, 3, 2],
                [2, 1, 3],
                [2, 3, 1],
                [3, 1, 2],
                [3, 2, 1],
            ],
        },
        {
            "input": [[0, 1]],
            "expected": [
                [0, 1],
                [1, 0],
            ],
        },
        {
            "input": [[1]],
            "expected": [[1]],
        },
    ],
)
