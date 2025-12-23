# https://leetcode.com/problems/search-in-rotated-sorted-array/description/

from test import test


class Solution:
    def search(self, nums: list[int], target: int) -> int:
        start = 0
        end = len(nums) - 1

        while start <= end:

            middle = (start + end) // 2

            if nums[middle] == target:
                return middle

            if nums[middle] >= nums[start]:
                if target >= nums[start] and target < nums[middle]:
                    end = middle - 1
                else:
                    start = middle + 1
            else:
                if target > nums[middle] and target <= nums[end]:
                    start = middle + 1
                else:
                    end = middle - 1

        return -1


solution = Solution()


test(
    solution.search,
    [
        {
            "input": [[4, 5, 6, 7, 8, 1, 2, 3], 8],
            "expected": 4,
        },
        {
            "input": [[1, 3], 3],
            "expected": 1,
        },
        {
            "input": [[5, 1, 3], 5],
            "expected": 0,
        },
        {
            "input": [[4, 5, 6, 7, 0, 1, 2], 0],
            "expected": 4,
        },
        {
            "input": [[4, 5, 6, 7, 0, 1, 2], 3],
            "expected": -1,
        },
        {
            "input": [[1], 0],
            "expected": -1,
        },
    ],
)
