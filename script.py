from test import test


class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left = 0
        right = len(nums) - 1

        while left <= right:
            pivot_index = int((left + right) // 2)
            pivot = nums[pivot_index]

            if target == pivot:
                return pivot_index

            is_pivot_in_left = pivot >= nums[left]

            if is_pivot_in_left:
                if nums[left] <= target < pivot:
                    right = pivot_index - 1
                else:
                    left = pivot_index + 1
            else:
                if pivot < target <= nums[right]:
                    left = pivot_index + 1
                else:
                    right = pivot_index - 1

        return -1


solution = Solution()


test(
    solution.search,
    [
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
