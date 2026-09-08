# https://leetcode.com/problems/maximum-sum-circular-subarray/description/

from test import test


class Solution:
    def maxSubarraySumCircular(self, nums: list[int]) -> int:
        local_max = nums[0]
        global_max = nums[0]

        local_min = nums[0]
        global_min = nums[0]

        total_sum = nums[0]

        for num in nums[1:]:
            local_max = max(local_max + num, num)
            global_max = max(global_max, local_max)

            local_min = min(local_min + num, num)
            global_min = min(global_min, local_min)

            total_sum += num

        if global_max < 0:
            return global_max

        return max(global_max, total_sum - global_min)


solution = Solution()


test(
    solution.maxSubarraySumCircular,
    [
        {
            "input": [[1, -2, 3, -2]],
            "expected": 3,  # 3
        },
        {
            "input": [[5, -3, 5]],
            "expected": 10,  # 7
        },
        {
            "input": [[-3, -2, -3]],
            "expected": -2,  # -2
        },
    ],
)
