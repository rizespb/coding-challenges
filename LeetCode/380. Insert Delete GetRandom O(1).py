# https://leetcode.com/problems/insert-delete-getrandom-o1/description/
from random import random


class RandomizedSet:

    def __init__(self) -> None:
        self.list: list[int] = []
        self.hash: dict[int, int] = {}

    def insert(self, val: int) -> bool:
        if val in self.hash:
            return False

        self.list.append(val)
        self.hash[val] = len(self.list) - 1

        return True

    def remove(self, val: int) -> bool:
        if val not in self.hash:
            return False

        index = self.hash[val]

        self.list[index] = self.list[(len(self.list)) - 1]
        self.hash[self.list[index]] = index

        del self.hash[val]
        self.list.pop()

        return True

    def getRandom(self) -> int:
        index = int(random() * len(self.list))

        return self.list[index]
