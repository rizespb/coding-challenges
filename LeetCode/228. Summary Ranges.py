# https://leetcode.com/problems/summary-ranges/description/


class Solution:
    def summaryRanges(self, nums):
        start = nums[0]

        result = []

        for index in range(len(nums)):
            if index < len(nums) - 1 and nums[index] + 1 == nums[index + 1]:
                continue

            if start == index:
                result.append(f"{nums[index]}")
            else:
                result.append(f"{nums[start]}->{nums[index]}")

            start = index + 1

        return result


solution = Solution()

solution.summaryRanges([0, 1, 2, 4, 5, 7])  # ["0->2","4->5","7"]
solution.summaryRanges([0, 2, 3, 4, 6, 8, 9])  # ["0","2->4","6","8->9"]
