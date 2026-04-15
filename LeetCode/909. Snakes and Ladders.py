# https://leetcode.com/problems/snakes-and-ladders/description/

from test import test


class Solution:
    def snakesAndLadders(self, board: list[list[int]]) -> int:
        size = len(board)
        max_value = size**2

        results: list[int] = []

        queue: list[tuple[int, int]] = [(1, 0)]

        visited: dict[int, int] = {}

        while len(queue) != 0:

            value, num = queue.pop(0)

            if value == max_value:
                results.append(num)
                continue

            if value in visited and num >= visited[value]:
                continue

            visited[value] = num

            last_empty_index: int | None = None

            for index in range(value + 1, min(value + 7, max_value + 1)):
                row, column = self.get_coords(index, size)

                if board[row][column] == -1:
                    last_empty_index = index
                    continue

                queue.append((board[row][column], num + 1))

            if last_empty_index is not None:
                queue.append((last_empty_index, num + 1))

        return min(results) if len(results) != 0 else -1

    def get_coords(self, value, size) -> tuple[int, int]:
        row = size - 1 - ((value - 1) // size)

        column: int = 0

        # Reversed order
        if size % 2 == row % 2:
            column = size - 1 - (value - 1) % size
        # Direct order
        else:
            column = (value - 1) % size

        return (row, column)


solution = Solution()


# 21 22 23 24 25
# 20 19 18 17 16
# 11 12 13 14 15
#  10 9  8  7  6
#  1  2  3  4  5

test(
    solution.snakesAndLadders,
    [
        {
            "input": [
                [
                    [-1, 10, -1, 15, -1],
                    [-1, -1, 18, 2, 20],
                    [-1, -1, 12, -1, -1],
                    [2, 4, 11, 18, 8],
                    [-1, -1, -1, -1, -1],
                ],
            ],
            "expected": 3,
        },
        {
            "input": [
                [
                    [-1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1],
                    [-1, 35, -1, -1, 13, -1],
                    [-1, -1, -1, -1, -1, -1],
                    [-1, 15, -1, -1, -1, -1],
                ],
            ],
            "expected": 4,
        },
        {
            "input": [
                [
                    [-1, -1],
                    [-1, 3],
                ],
            ],
            "expected": 1,
        },
    ],
)
