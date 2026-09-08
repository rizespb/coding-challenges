# https://leetcode.com/problems/pacific-atlantic-water-flow/description/

from test import test


class Solution:
    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:
        rows = len(heights)
        columns = len(heights[0])

        pacific: list[list[bool]] = [[False] * columns for _ in range(rows)]
        atlantic: list[list[bool]] = [[False] * columns for _ in range(rows)]

        directions: tuple[tuple[int, int], ...] = ((-1, 0), (1, 0), (0, -1), (0, 1))

        def dfs(y, x, ocean) -> None:
            if ocean[y][x]:
                return

            ocean[y][x] = True

            for delta_y, delta_x in directions:
                new_y = y + delta_y
                new_x = x + delta_x

                should_skip = (
                    new_y < 0
                    or new_y >= rows
                    or new_x < 0
                    or new_x >= columns
                    or ocean[new_y][new_x]
                )

                if should_skip:
                    continue

                if heights[new_y][new_x] < heights[y][x]:
                    continue

                dfs(new_y, new_x, ocean)

        for index in range(columns):
            dfs(0, index, pacific)
            dfs(rows - 1, index, atlantic)

        for index in range(max(rows, columns)):
            if index < rows:
                dfs(index, 0, pacific)
                dfs(index, columns - 1, atlantic)

            if index < columns:
                dfs(0, index, pacific)
                dfs(rows - 1, index, atlantic)

        result: list[list[int]] = []

        for y, x in [[y, x] for x in range(columns) for y in range(rows)]:
            if pacific[y][x] and atlantic[y][x]:
                result.append([y, x])

        return result


solution = Solution()


test(
    solution.pacificAtlantic,
    [
        {
            "input": [
                [
                    [1, 2, 2, 3, 5],
                    [3, 2, 3, 4, 4],
                    [2, 4, 5, 3, 1],
                    [6, 7, 1, 4, 5],
                    [5, 1, 1, 2, 4],
                ],
            ],
            "expected": [
                [0, 4],
                [1, 3],
                [1, 4],
                [2, 2],
                [3, 0],
                [3, 1],
                [4, 0],
            ],
        },
        {
            "input": [[[1]]],
            "expected": [[0, 0]],
        },
        {
            "input": [
                [
                    [10, 10, 10],
                    [10, 1, 10],
                    [10, 10, 10],
                ],
            ],
            "expected": [
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 0],
                [1, 2],
                [2, 0],
                [2, 1],
                [2, 2],
            ],
        },
    ],
)
