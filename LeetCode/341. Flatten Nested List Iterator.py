# https://leetcode.com/problems/flatten-nested-list-iterator/description/


class NestedIterator:
    def __init__(self, nested_list):
        self.list = self.flatten(nested_list)
        self.count = 0

    def next(self) -> int:
        self.count += 1
        return self.list[self.count - 1]

    def hasNext(self) -> bool:
        return self.count < len(self.list)

    def flatten(self, nested_list) -> list[int]:
        result: list[int] = []

        for item in nested_list:
            if item.isInteger():
                result.append(item.getInteger())
            else:
                result.extend(self.flatten(item.getList()))

        return result
