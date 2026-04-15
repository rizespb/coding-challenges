# https://leetcode.com/problems/clone-graph/description/
from collections import deque


class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


# Важно,чтобы к моменту добавления в очередь дубликат вершины уже был помещен в map
# В противном случае вершины могут дублироваться
class Solution:
    def cloneGraph(self, node: Node | None) -> Node | None:
        if node is None:
            return None

        start = node

        my_dict: dict[int, Node] = {}

        queue = deque([start])

        my_dict[start.val] = Node(start.val)

        while len(queue):
            current = queue.popleft()

            for neighbor in current.neighbors:
                if neighbor.val not in my_dict:
                    queue.append(neighbor)

                    my_dict[neighbor.val] = Node(neighbor.val)

                my_dict[current.val].neighbors.append(my_dict[neighbor.val])

        return my_dict[start.val]
