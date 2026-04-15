# https://leetcode.com/problems/course-schedule-ii/submissions/1967523988
from test import test


# Подробное объяснение в решении на JavaScript
class Solution:
    def findOrder(self, num_courses: int, prerequisites: list[list[int]]) -> list[int]:
        result: list[int] = []

        prerequisites_map: dict[int, list[int]] = {}
        degrees: list[int] = [0] * num_courses

        for index in range(num_courses):
            prerequisites_map[index] = []

        for course, prerequisite in prerequisites:
            prerequisites_map[prerequisite].append(course)

            degrees[course] += 1

        print(prerequisites_map)
        print(degrees)

        queue: list[int] = []

        for index, degree in enumerate(degrees):
            if degree == 0:
                queue.append(index)

        while len(queue) != 0:
            current = queue.pop()

            result.append(current)

            for neighbour in prerequisites_map[current]:
                degrees[neighbour] -= 1

                if degrees[neighbour] == 0:
                    queue.append(neighbour)

        return result if len(result) == num_courses else []


solution = Solution()


test(
    solution.findOrder,
    [
        {
            "input": [2, [[1, 0]]],
            "expected": [0, 1],
        },
        {
            "input": [
                4,
                [
                    [1, 0],
                    [2, 0],
                    [3, 1],
                    [3, 2],
                ],
            ],
            "expected": [0, 2, 1, 3],
        },
        {
            "input": [1, []],
            "expected": [0],
        },
    ],
)
