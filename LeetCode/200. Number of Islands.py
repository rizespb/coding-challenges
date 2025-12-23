# https://leetcode.com/problems/number-of-islands/description/

from test import test


def set_zeros(y: int, x: int, max_y: int, max_x: int, grid: list[list[str]]) -> None:
    if grid[y][x] == "0":
        return

    grid[y][x] = "0"

    if y > 0:
        set_zeros(y - 1, x, max_y, max_x, grid)

    if y < max_y:
        set_zeros(y + 1, x, max_y, max_x, grid)

    if x > 0:
        set_zeros(y, x - 1, max_y, max_x, grid)

    if x < max_x:
        set_zeros(y, x + 1, max_y, max_x, grid)


class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        counter = 0

        max_y = len(grid) - 1
        max_x = len(grid[0]) - 1

        for y in range(max_y + 1):
            for x in range(max_x + 1):
                if grid[y][x] == "1":
                    counter += 1
                    set_zeros(y, x, max_y, max_x, grid)

        return counter


solution = Solution()

matrix1 = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
]

matrix2 = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
]

matrix3 = [["1"], ["1"]]

test(
    solution.numIslands,
    [
        {
            "input": [matrix1],
            "expected": 1,
        },
        {
            "input": [matrix2],
            "expected": 3,
        },
        {
            "input": [matrix3],
            "expected": 1,
        },
    ],
)
