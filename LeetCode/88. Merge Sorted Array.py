# https://leetcode.com/problems/merge-sorted-array/description/
from test import test


class Solution:
    def merge(
        self, nums1: list[int], length1: int, nums2: list[int], length2: int
    ) -> None:
        index1 = length1 - 1
        index2 = length2 - 1

        common_index = len(nums1) - 1

        while index1 >= 0 or index2 >= 0:
            value1 = nums1[index1] if index1 >= 0 else None
            value2 = nums2[index2] if index2 >= 0 else None

            if value1 is not None and (value2 is None or value1 >= value2):
                nums1[common_index] = value1
                index1 -= 1
            elif value2 is not None:
                nums1[common_index] = value2
                index2 -= 1

            common_index -= 1


solution = Solution()


test(
    solution.merge,
    [
        {
            "input": [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
            "expected": [1, 2, 2, 3, 5, 6],
        },
        {
            "input": [[1], 1, [], 0],
            "expected": [1],
        },
        {
            "input": [[0], 0, [1], 1],
            "expected": [1],
        },
    ],
)
