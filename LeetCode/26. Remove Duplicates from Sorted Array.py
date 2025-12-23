# https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

from test import test

# Надо вернуть количество уникальных элементов k
# и изменить входной массив "на месте",
# чтобы первыми шли уникальные элементы в отсортированном порядке
# После k-того элемента массив может выглядеть как угодно


class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        current_index = 0

        prev = None

        for num in nums:
            if num == prev:
                continue

            nums[current_index] = num
            prev = num
            current_index += 1

        return current_index


solution = Solution()


test(
    solution.removeDuplicates,
    [
        {
            "input": [[1, 1, 2]],
            "expected": 2,  # nums to be [1, 2, _] or [1, 2, 1]
        },
        {
            "input": [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]],
            "expected": 5,
            # nums to be [0, 1, 2, 3 ,4 ,_ ,_, _, _, _] or [0, 1, 2, 3, 4, 0, 1, 1, 2, 3]
        },
    ],
)
