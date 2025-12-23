# https://leetcode.com/problems/maximize-distance-to-closest-person/description/
import math
from test import test
from typing import List

# Решение 1:
# class Solution:
#     def getDistance(self, start_index, finish_index, seats: List[int]) -> int:

#         if start_index == 0 or finish_index == len(seats) - 1:
#             return finish_index - start_index + 1

#         middle_index = (start_index + finish_index) // 2

#         return min(middle_index - start_index, finish_index - middle_index) + 1

#     def maxDistToClosest(self, seats: List[int]) -> int:

#         start = None

#         max_distance = 0

#         for index, value in enumerate(seats):
#             isZero = value == 0

#             if isZero and start is None:
#                 start = index

#             if not isZero or (index < len(seats) - 1 and seats[index + 1] == 0):
#                 continue

#             current_distance = self.getDistance(start, index, seats)

#             max_distance = max(max_distance, current_distance)

#             start = None

#         return max_distance

# Решение 2:
# За основу взят принцип:
# Получить длину максимальной последовательности из 0. Поделить на пополам с округлением в большую сторону (по условию задачу если между креслом Алекса и ближайшим соседом одном место, maxDistance считается равной 2).
# Если максимальная дистанция в начале или в конце ряда, то Алекс может занять место не по середине, а самое крайнее. Для этих случаев мы считаем, что maxDistance в два раза больше, чем количество нулей в подпоследовательности


class Solution:
    def maxDistToClosest(self, seats: List[int]) -> int:
        max_distance = 0
        current_distance = 0

        is_start = True

        for index, value in enumerate(seats):
            if value == 0:
                current_distance += 1

                is_double = is_start or index == len(seats) - 1

                current = current_distance * 2 if is_double else current_distance

                max_distance = max(max_distance, current)

                continue

            is_start = False
            current_distance = 0

        return math.ceil(max_distance / 2)


solution = Solution()


test(
    solution.maxDistToClosest,
    [
        {
            "input": [[1, 0, 0, 0, 1, 0, 1]],
            "expected": 2,
        },
        {
            "input": [[1, 0, 0, 0]],
            "expected": 3,
        },
    ],
)
