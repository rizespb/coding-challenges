# https://leetcode.com/problems/implement-queue-using-stacks/description/
class MyQueue:
    def __init__(self) -> None:
        self.stack: list[int] = []
        self.reversed_stack: list[int] = []
        self.first: int | None = None
        self.size = 0

    def push(self, x: int) -> None:
        if self.first is None:
            self.first = x
        self.stack.append(x)
        self.size += 1

    def pop(self) -> int:
        while self.size:
            self.reversed_stack.append(self.stack.pop())
            self.size -= 1
        self.first = None
        first = self.reversed_stack.pop()
        while len(self.reversed_stack):
            value = self.reversed_stack.pop()
            if self.size == 0:
                self.first = value
            self.stack.append(value)
            self.size += 1
        return first

    def peek(self) -> int | None:
        return self.first

    def empty(self) -> bool:
        return not self.stack
