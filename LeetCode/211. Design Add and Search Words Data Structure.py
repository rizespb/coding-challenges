# https://leetcode.com/problems/design-add-and-search-words-data-structure/description/


class WordDictionary:

    def __init__(self, value: str = "."):
        self.value = value
        self.children: dict[str, WordDictionary] = {}
        self.is_end_of_word = False

    def addWord(self, word: str) -> None:
        current = self

        for char in word:
            if char not in current.children:
                current.children[char] = WordDictionary(char)

            current = current.children[char]

        current.is_end_of_word = True

    def search(self, word: str) -> bool:
        def traverse(index: int, current: WordDictionary) -> bool:
            if index == len(word):
                return current.is_end_of_word

            if word[index] == ".":
                for char in current.children:
                    if traverse(index + 1, current.children[char]):
                        return True

            if word[index] not in current.children:
                return False

            return traverse(index + 1, current.children[word[index]])

        return traverse(0, self)
