# https://leetcode.com/problems/subarray-sum-equals-k/description/
class Solution:
    def subarraySum(self, nums, target: int) -> int:
        result = 0

        currentSum = 0

        dictionary: dict[int, int] = {}

        for value in nums:
            currentSum += value

            if currentSum == target:
                result += 1

            pairedSum = currentSum - target

            pairedSumAmount = dictionary.get(pairedSum)

            if pairedSumAmount:
                result += pairedSumAmount

            dictionary[currentSum] = (dictionary.get(currentSum, 0)) + 1

        return result


solution = Solution()

print("Result is: ", solution.subarraySum([1, 1, 1], 2))  # 2
print("Result is: ", solution.subarraySum([1, 2, 3], 3))  # 2
print("Result is: ", solution.subarraySum([1, -1, 0], 0))  # 2
