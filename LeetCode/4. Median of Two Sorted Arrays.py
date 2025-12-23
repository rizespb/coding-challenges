from test import test


# В JavaScript-решении подход похожий, но немного отличается. Принцип один и тот же: находим элемент (или два элемента) в середине итогового списка без создания самого списка
# Если в результирующем массиве нечетное количество элементов, тогда нам нужен просто центральный элемент. Если общее количество элементов четное, тогда нам нужна сумма двух центральных элементов, разделенная на 2
class Solution:
    def findMedianSortedArrays(
        self, nums1: list[int], nums2: list[int]
    ) -> float | int | None:
        length1, length2 = len(nums1), len(nums2)
        common_length = length1 + length2

        target_index = common_length // 2

        # Общее количество элементов нечетное или четное
        is_odd = common_length % 2 != 0

        # Текущие индексы списках nums1 и nums2
        index1 = -1
        index2 = -1

        # Текущий элемент в общем массиве
        current = float("-inf")
        # Элемент перед текущим
        prev = float("-inf")

        while index1 + index2 < common_length:
            # Если сумма индексов равна целевому индексу, то возвращаем результат
            # Прибавляем 1, т.к. в результирующем списке индекс всегда на 1 опережает сумму индексов в двух списках
            if index1 + index2 + 1 == target_index:
                return current if is_odd else (current + prev) / 2

            prev = current

            # Если мы достигли конца второго массива или текущий элемент в первом списке меньше текущего элемента во втором списке
            if index2 + 1 >= length2 or (
                index1 + 1 < length1 and nums1[index1 + 1] < nums2[index2 + 1]
            ):
                # То двигаем указатель первого списка
                index1 += 1

                current = nums1[index1]
            else:
                # В противном случае - второго
                index2 += 1
                current = nums2[index2]

        return None


solution = Solution()


test(
    solution.findMedianSortedArrays,
    [
        {
            "input": [[1, 3], [2]],
            "expected": 2,
        },
        {
            "input": [
                [1, 2],
                [3, 4],
            ],
            "expected": 2.5,
        },
        {
            "input": [
                [0, 0],
                [0, 0],
            ],
            "expected": 0,
        },
        {
            "input": [[], [1]],
            "expected": 1,
        },
        {
            "input": [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            ],
            "expected": 9,
        },
        {
            "input": [[3, 4], []],
            "expected": 3.5,
        },
        {
            "input": [[2, 2, 4, 4], [2, 2, 2, 4, 4]],
            "expected": 2,
        },
    ],
)
