# https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/

from test import test


class Solution:
    def shipWithinDays(self, weights: list[int], days: int) -> float:
        max_weight = max(weights)
        sum_of_weights = sum(weights)

        start = max_weight
        end = sum_of_weights

        min_capacity = float("inf")

        while start <= end:
            current_capacity = (end + start) // 2

            current_sum = 0

            days_count = 0

            for weight in weights:
                if current_sum + weight > current_capacity:
                    days_count += 1
                    current_sum = 0

                current_sum += weight

            if current_sum != 0:
                days_count += 1

            if days_count <= days:
                min_capacity = min(min_capacity, current_capacity)

                end = current_capacity - 1
                continue

            start = current_capacity + 1

        return min_capacity


solution = Solution()


test(
    solution.shipWithinDays,
    [
        {
            "input": [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5],
            "expected": 15,
        },
        {
            "input": [[3, 2, 2, 4, 1, 4], 3],
            "expected": 6,
        },
        {
            "input": [[1, 2, 3, 1, 1], 4],
            "expected": 3,
        },
        {
            "input": [[3, 2, 2, 4], 3],
            "expected": 4,
        },
    ],
)
