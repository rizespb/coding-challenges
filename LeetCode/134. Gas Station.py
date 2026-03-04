# https://leetcode.com/problems/gas-station/description/

from test import test


class Solution:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        total_gas = 0
        total_cost = 0

        current_gas = gas[0]

        start = 0

        for index, value_gas in enumerate(gas):
            total_gas += value_gas
            total_cost += cost[index]

            current_gas -= cost[index]

            if current_gas < 0:
                start = index + 1
                current_gas = 0

            # if нужен исключительно для предотвращения выхода index+1 за пределы массива
            current_gas += gas[index + 1] if index + 1 < len(gas) else 0

        return start if total_gas >= total_cost else -1


solution = Solution()

test(
    solution.canCompleteCircuit,
    [
        {
            "input": [
                [1, 2, 3, 4, 5],
                [3, 4, 5, 1, 2],
            ],
            "expected": 3,
        },
        {
            "input": [
                [2, 3, 4],
                [3, 4, 3],
            ],
            "expected": -1,
        },
        {
            "input": [
                [5, 1, 2, 3, 4],
                [4, 4, 1, 5, 1],
            ],
            "expected": 4,
        },
        {
            "input": [
                [3, 1, 1],
                [1, 2, 2],
            ],
            "expected": 0,
        },
    ],
)
