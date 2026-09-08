# https://leetcode.com/problems/kth-largest-element-in-an-array/

from test import test


class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        num_min = min(nums)
        num_max = max(nums)

        positions_list: list[int] = [0] * (num_max - num_min + 1)

        for num in nums:
            positions_list[num - num_min] += 1

        print(positions_list)

        count = k

        for index in range(len(positions_list) - 1, -1, -1):
            count -= positions_list[index]

            if count <= 0:
                return index + num_min

        return -1


solution = Solution()


test(
    solution.findKthLargest,
    [
        {
            "input": [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
            "expected": 4,
        },
        {
            "input": [[3, 2, 1, 5, 6, 4], 2],
            "expected": 5,
        },
        {
            "input": [[99, 99], 1],
            "expected": 99,
        },
        {
            "input": [[-1, -1], 2],
            "expected": -1,
        },
        {
            "input": [[-1, 2, 0], 2],
            "expected": 0,
        },
    ],
)
