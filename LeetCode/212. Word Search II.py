# https://leetcode.com/problems/word-search-ii/
from test import test


class WordDictionary:
    children: dict[str, "WordDictionary"]
    value: str
    is_end: bool

    def __init__(self, value: str = ".") -> None:
        self.value = value
        self.children = {}
        self.is_end = False

    def add_word(self, word: str) -> None:
        current = self

        for char in word:
            if char not in current.children:
                current.children[char] = WordDictionary(char)
            current = current.children[char]

        current.is_end = True


class Solution:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        words_dict = WordDictionary()

        for word in words:
            words_dict.add_word(word)

        max_x = len(board[0]) - 1
        max_y = len(board) - 1

        result: set[str] = set()

        def traverse(
            x: int, y: int, node: WordDictionary = words_dict, word: str = ""
        ) -> None:
            char = board[y][x]
            new_word = word + char

            if node.is_end is True:
                result.add(new_word)

            board[y][x] = "."

            left = (x - 1, y)
            right = (x + 1, y)
            up = (x, y - 1)
            down = (x, y + 1)

            coords_list = filter(
                lambda coords: 0 <= coords[0] <= max_x and 0 <= coords[1] <= max_y,
                [left, right, up, down],
            )
            for coords in coords_list:
                x_coord, y_coord = coords
                new_char = board[y_coord][x_coord]

                if new_char in node.children:
                    traverse(x_coord, y_coord, node.children[new_char], new_word)

            board[y][x] = char

        for y in range(max_y + 1):
            for x in range(max_x + 1):
                char = board[y][x]
                if char in words_dict.children:
                    traverse(x, y, words_dict.children[char])

        return list(result)


solution = Solution()


test(
    solution.findWords,
    [
        {
            "input": [
                [
                    ["o", "a", "a", "n"],
                    ["e", "t", "a", "e"],
                    ["i", "h", "k", "r"],
                    ["i", "f", "l", "v"],
                ],
                ["oath", "pea", "eat", "rain", "oatk"],
            ],
            "expected": [
                "eat",
                "oath",
            ],
        },
        {
            "input": [[["a", "b"], ["c", "d"]], ["abcb"]],
            "expected": [],
        },
        {
            "input": [
                [
                    ["o", "a", "a", "n"],
                    ["e", "t", "a", "e"],
                    ["i", "h", "k", "r"],
                    ["i", "f", "l", "v"],
                ],
                ["oath", "pea", "eat", "rain", "hklf", "hf"],
            ],
            "expected": ["oath", "eat", "hklf", "hf"],
        },
    ],
)
