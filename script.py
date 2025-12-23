from test import test


class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        profit = 0

        purchase = None

        for index, price in enumerate(prices):
            if purchase is None or price <= purchase:
                purchase = price
                continue

            if index < len(prices) - 1 and price < prices[index + 1]:
                continue

            profit += price - purchase
            purchase = None

        return profit


solution = Solution()


test(
    solution.maxProfit,
    [
        {
            "input": [[7, 1, 5, 3, 6, 4]],
            "expected": 7,
        },
        {
            "input": [[1, 2, 3, 4, 5]],
            "expected": 4,
        },
        {
            "input": [[7, 6, 4, 3, 1]],
            "expected": 0,
        },
        {
            "input": [[2, 1, 2, 0, 1]],
            "expected": 2,
        },
    ],
)
