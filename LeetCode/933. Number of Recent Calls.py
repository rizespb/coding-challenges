# https://leetcode.com/problems/number-of-recent-calls/description/
from test import test


class RecentCounter:
    def __init__(self):
        self.requests = []

    def ping(self, t: int) -> int:
        self.requests.append(t)

        while t - self.requests[0] > 3000:
            self.requests.pop(0)

        return len(self.requests)


test(
    RecentCounter().ping,
    [
        {
            "input": [1],
            "expected": 1,
        },
        {
            "input": [100],
            "expected": 2,
        },
        {
            "input": [3001],
            "expected": 3,
        },
        {
            "input": [3002],
            "expected": 3,
        },
    ],
)
