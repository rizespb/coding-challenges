# https://leetcode.com/problems/lru-cache/description/


class Node:
    def __init__(self, key, value, prevNode=None, nextNode=None):
        self.key = key
        self.value = value
        self.prev = prevNode
        self.next = nextNode


class LRUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.size = 0
        self.map = {}  # type: ignore

        self.tail = None
        self.head = None

    def get(self, key: int) -> int:
        if key not in self.map:
            return -1

        self.update_list(key)

        return self.map[key].value

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            self.map[key].value = value
            self.update_list(key)

            return

        node = Node(key, value)

        self.map[key] = node

        if self.size == 0:
            self.tail = node  # type: ignore
            self.head = node  # type: ignore
        else:
            self.head.next = node  # type: ignore
            node.prev = self.head  # type: ignore
            self.head = node  # type: ignore

        self.size += 1

        if self.size > self.capacity:
            del self.map[self.tail.key]  # type: ignore

            self.tail = self.tail.next  # type: ignore
            self.tail.prev = None  # type: ignore
            self.size -= 1

    def update_list(self, key):
        node = self.map[key]

        if self.head == node:
            return

        if self.tail == node:
            self.tail = node.next
            self.tail.prev = None
        else:
            node.prev.next = node.next
            node.next.prev = node.prev

        self.head.next = node
        node.next = None
        node.prev = self.head
        self.head = node


# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)
