# https://leetcode.com/problems/game-of-life/description/

from test import test


class Solution:
    def gameOfLife(self, board: list[list[int]]) -> list[list[int]]:
        max_x = len(board[0]) - 1
        max_y = len(board) - 1

        def should_change_state(x, y):
            is_alive = bool(board[y][x])
            alive = 0

            for y_coord in range(max(0, y - 1), min(max_y, y + 1) + 1):
                for x_coord in range(max(0, x - 1), min(max_x, x + 1) + 1):
                    if x_coord == x and y_coord == y:
                        continue

                    if board[y_coord][x_coord]:
                        alive += 1

            if not is_alive:
                return alive == 3

            return alive < 2 or alive > 3

        change_state: list[tuple[int, int]] = []

        for y in range(max_y + 1):
            for x in range(max_x + 1):
                if should_change_state(x, y):
                    change_state.append((x, y))

        for coords in change_state:
            x, y = coords
            print(x, y)

            board[y][x] = 0 if board[y][x] else 1

        return board


solution = Solution()


test(
    solution.gameOfLife,
    [
        {
            "input": [
                [
                    [0, 1, 0],
                    [0, 0, 1],
                    [1, 1, 1],
                    [0, 0, 0],
                ],
            ],
            "expected": [
                [0, 0, 0],
                [1, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ],
        },
        {
            "input": [
                [
                    [1, 1],
                    [1, 0],
                ],
            ],
            "expected": [
                [1, 1],
                [1, 1],
            ],
        },
    ],
)
