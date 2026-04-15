# https://leetcode.com/problems/evaluate-division/description/

from test import test


class Solution:
    def calcEquation(
        self, equations: list[list[str]], values: list[float], queries: list[list[str]]
    ) -> list[float]:
        results: list[float] = []

        my_map: dict[str, dict[str, float]] = {}

        for index, pair in enumerate(equations):
            a, b = pair

            value = values[index]

            if a not in my_map:
                my_map[a] = {}

            if b not in my_map:
                my_map[b] = {}

            my_map[a][b] = 1 / value
            my_map[b][a] = value

        print(my_map)

        def dfs(a: str, b: str, visited: set | None):
            if visited is None:
                visited = set()

            if a in my_map and b in my_map[a]:
                return 1 / my_map[a][b]

            visited.add(a)

            for key in my_map[a]:
                if key in visited:
                    continue

                result = dfs(key, b, visited)

                if result != -1:
                    return result / my_map[a][key]

            return -1

        for query in queries:
            a, b = query

            if a not in my_map or b not in my_map:
                results.append(-1)
                continue

            results.append(dfs(a, b, set()))
        return results


solution = Solution()


test(
    solution.calcEquation,
    [
        {
            "input": [
                [
                    ["a", "b"],
                    ["b", "c"],
                ],
                [2.0, 3.0],
                [
                    ["a", "c"],
                    ["b", "a"],
                    ["a", "e"],
                    ["a", "a"],
                    ["x", "x"],
                ],
            ],
            "expected": [6.0, 0.5, -1.0, 1.0, -1.0],
        },
        {
            "input": [
                [
                    ["a", "b"],
                    ["b", "c"],
                    ["bc", "cd"],
                ],
                [1.5, 2.5, 5.0],
                [
                    ["a", "c"],
                    ["c", "b"],
                    ["bc", "cd"],
                    ["cd", "bc"],
                ],
            ],
            "expected": [3.75, 0.4, 5.0, 0.2],
        },
        {
            "input": [
                [["a", "b"]],
                [0.5],
                [
                    ["a", "b"],
                    ["b", "a"],
                    ["a", "c"],
                    ["x", "y"],
                ],
            ],
            "expected": [0.5, 2.0, -1.0, -1.0],
        },
    ],
)
