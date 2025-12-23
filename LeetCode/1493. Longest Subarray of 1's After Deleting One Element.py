# https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/
class Solution(object):
    def longestSubarray(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        currentMax1 = 0
        currentMax2 = 0

        maxResult = 0

        for index, value in enumerate(nums):
            if value == 1:
                currentMax1 += 1
                currentMax2 += 1

                continue

            maxResult = max(maxResult, currentMax1, currentMax2)

            currentMax2 = currentMax1
            currentMax1 = 0

        maxResult = max(maxResult, currentMax1, currentMax2)

        return maxResult - 1 if maxResult == len(nums) else maxResult


solution = Solution()

print(solution.longestSubarray([1, 1, 0, 1]))  # 3
print(solution.longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1]))  # 5
print(
    solution.longestSubarray([1, 1, 1])
)  # 2 - обязательно надо удалить хотя бы 1 элемент из исходного массива
