# https://leetcode.com/problems/move-zeroes/description/


class Solution:
    def moveZeroes(self, nums):
        zeros = []
        zerosCount = 0

        for index, value in enumerate(nums):
            if value == 0:
                zeros.append(index)
                zerosCount += 1
                continue

            if zerosCount:
                nums[index], nums[zeros[-zerosCount]] = (
                    nums[zeros[-zerosCount]],
                    nums[index],
                )

                zeros.append(index)

        return nums


solution = Solution()

print("Result is: ", solution.moveZeroes([0, 1, 0, 3, 12]))  # [1, 3, 12, 0, 0]
print("Result is: ", solution.moveZeroes([0]))  # [0]
print("Result is: ", solution.moveZeroes([]))  # []
