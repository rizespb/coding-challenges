# http://leetcode.com/problems/implement-stack-using-queues/description/?q=stack+queue
from collections import deque


class MyStack:
    def __init__(self):
        self.queue = deque()

    def push(self, x: int) -> None:
        current_range = range(0, len(self.queue))
        self.queue.append(x)
        for _ in current_range:
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        return self.queue.popleft()

    def top(self) -> int:
        return self.queue[0]

    def empty(self) -> bool:
        return not self.queue
