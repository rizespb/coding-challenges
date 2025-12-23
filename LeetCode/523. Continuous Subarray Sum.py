# https://leetcode.com/problems/continuous-subarray-sum/description/

from test import test


# Общая идея: в map сохраняем остатки от деления суммы элементов от 0 до i и соответствующие индексы элементов i
# Если в какой-то момент мы получаем остаток от деления, который уже есть в map,
# значит последовательность элементов от i+1 до текущего элементам делится без остатка
# Например, последовательность 5 2 2 8 1 10 15 13, target 4
# 5 % 4 = 1 -> {1: 0}
# (5+2) % 4 = 3 -> {1: 0, 3: 1}
# (7+2) % 4 = 1 -> ключ 1 уже есть в map, значение по ключу 1 - это 0. Значит сумма элементов от элемента с индексом 1 (0+1) до текущего делится target без остатка
class Solution:
    def checkSubarraySum(self, nums: list[int], target: int) -> bool:
        if len(nums) < 2:
            return False

        # Для случая, когда нужная последовательность элементов начинается в 0 индексе
        # Например:
        # [23, 2, 4, 6, 6], 7 ---> нужная последовательность 23+2+4+6 = 35
        # при таком подходе при проверке остатка на элементе nums[3] получится 0, но в map не будет свойства {0: индекс}
        # Поэтому добавляем искусственно значение для
        reminders_map: dict[int, int] = {0: -1}

        current_sum = 0

        for index, value in enumerate(nums):
            current_sum += value
            reminder = current_sum % target

            if reminder in reminders_map:
                if index - reminders_map[reminder] > 1:
                    return True
            else:
                reminders_map[reminder] = index

        return False


solution = Solution()


test(
    solution.checkSubarraySum,
    [
        {
            "input": [[23, 2, 4, 6, 7], 6],
            "expected": True,  # [2, 4] = sum is 6 ---> 6 / 6 === 1 ---> 1 is integer
        },
        {
            "input": [[23, 2, 6, 4, 7], 6],
            "expected": True,  # [23, 2, 6, 4, 7] = sum is 42 ---> 42 / 6 === 7 ---> 1 is integer
        },
        {
            "input": [[23, 2, 6, 4, 7], 13],
            "expected": False,
        },
        {
            "input": [[23, 2, 4, 6, 6], 7],
            "expected": True,
        },
        {
            "input": [[1, 0], 2],
            "expected": False,
        },
        {
            "input": [[5, 0, 0, 0], 3],
            "expected": True,
        },
        {
            "input": [[1, 2, 12], 6],
            "expected": False,
        },
        {
            "input": [[0, 1, 0], 1],
            "expected": True,
        },
    ],
)
