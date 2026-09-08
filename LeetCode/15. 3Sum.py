# https://leetcode.com/problems/3sum/description/

from test import test


class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()

        length = len(nums)

        result: list[list[int]] = []

        for index in range(0, length - 2):
            if index > 0 and nums[index] == nums[index - 1]:
                continue

            left = index + 1
            right = length - 1

            while left < right:
                if nums[left] == nums[left - 1] and left > index + 1:
                    left += 1
                    continue

                if right < length - 1 and nums[right] == nums[right + 1]:
                    right -= 1
                    continue

                current_sum = nums[index] + nums[left] + nums[right]

                if current_sum == 0:
                    result.append([nums[index], nums[left], nums[right]])
                    left += 1

                if current_sum < 0:
                    left += 1
                else:
                    right -= 1

        return result


solution = Solution()


test(
    solution.threeSum,
    [
        {
            "input": [[-1, 0, 1, 2, -1, -4]],
            "expected": [
                [-1, -1, 2],
                [-1, 0, 1],
            ],
        },
        {
            "input": [[0, 1, 1]],
            "expected": [],
        },
        {
            "input": [[0, 0, 0]],
            "expected": [[0, 0, 0]],
        },
    ],
)
