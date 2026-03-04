# https://leetcode.com/problems/surrounded-regions/description/

from test import test


class Solution:
    def solve(self, board: list[list[str]]) -> None:
        max_x = len(board[0]) - 1
        max_y = len(board) - 1

        # dfs будем использовать только для нахождения пограничных регионов
        # Если ячейка является частью пограничного региона - записываем в нее edge
        def dfs(x, y) -> None:
            if any([x < 0, x > max_x, y < 0, y > max_y]):
                return

            if board[y][x] != "O":
                return

            board[y][x] = "edge"

            dfs(x + 1, y)
            dfs(x - 1, y)
            dfs(x, y + 1)
            dfs(x, y - 1)

        # Ищем пограничные регионы в первом и последнем столбцах
        for index_y in range(max_y + 1):
            if board[index_y][0] == "O":
                dfs(0, index_y)
            if board[index_y][max_x] == "O":
                dfs(max_x, index_y)

        # Ищем пограничные регионы в первой и последней колонках
        for index_x in range(max_x + 1):
            if board[0][index_x] == "O":
                dfs(index_x, 0)
            if board[max_y][index_x] == "O":
                dfs(index_x, max_y)

        # Все ячейки с edge относятся к пограничным регионам. Меняем в них edge на O
        # Все остальные ячейки с O - части внутренних регионов. Меняем в них O на X
        for index_y in range(max_y + 1):
            for index_x in range(max_x + 1):
                if board[index_y][index_x] == "O":
                    board[index_y][index_x] = "X"

                if board[index_y][index_x] == "edge":
                    board[index_y][index_x] = "O"


solution = Solution()

test(
    solution.solve,
    [
        {
            "input": [
                [
                    ["X", "X", "X", "X"],
                    ["X", "O", "O", "X"],
                    ["X", "X", "O", "X"],
                    ["X", "O", "X", "X"],
                ],
            ],
            "expected": [
                ["X", "X", "X", "X"],
                ["X", "X", "X", "X"],
                ["X", "X", "X", "X"],
                ["X", "O", "X", "X"],
            ],
        },
        {
            "input": [
                [
                    ["O", "O"],
                    ["O", "O"],
                ],
            ],
            "expected": [
                ["O", "O"],
                ["O", "O"],
            ],
        },
        {
            "input": [
                [
                    ["X", "O", "X", "O", "O", "O", "O"],
                    ["X", "O", "O", "O", "O", "O", "O"],
                    ["X", "O", "O", "O", "O", "X", "O"],
                    ["O", "O", "O", "O", "X", "O", "X"],
                    ["O", "X", "O", "O", "O", "O", "O"],
                    ["O", "O", "O", "O", "O", "O", "O"],
                    ["O", "X", "O", "O", "O", "O", "O"],
                ],
            ],
            "expected": [
                ["X", "O", "X", "O", "O", "O", "O"],
                ["X", "O", "O", "O", "O", "O", "O"],
                ["X", "O", "O", "O", "O", "X", "O"],
                ["O", "O", "O", "O", "X", "O", "X"],
                ["O", "X", "O", "O", "O", "O", "O"],
                ["O", "O", "O", "O", "O", "O", "O"],
                ["O", "X", "O", "O", "O", "O", "O"],
            ],
        },
    ],
)
