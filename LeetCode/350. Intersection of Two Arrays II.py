# https://leetcode.com/problems/intersection-of-two-arrays-ii/description/
from test import test


class Solution:
    def intersect(self, nums1: list[int], nums2: list[int]) -> list[int]:
        nums1.sort()
        nums2.sort()

        result: list[int] = []

        first_index = 0
        second_index = 0

        while first_index < len(nums1) and second_index < len(nums2):
            if nums1[first_index] < nums2[second_index]:
                first_index += 1
                continue

            if nums1[first_index] > nums2[second_index]:
                second_index += 1
                continue

            result.append(nums1[first_index])
            first_index += 1
            second_index += 1

        return result


solution = Solution()


test(
    solution.intersect,
    [
        {
            "input": [
                [1, 2, 2, 1],
                [2, 2],
            ],
            "expected": [2, 2],
        },
        {
            "input": [
                [4, 9, 5],
                [9, 4, 9, 8, 4],
            ],
            "expected": [4, 9],
        },
    ],
)
