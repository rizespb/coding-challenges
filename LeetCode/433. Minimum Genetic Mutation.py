# https://leetcode.com/problems/minimum-genetic-mutation/description/
from test import test
from collections import deque

# В решении JavaScript представлен итеративный подход

chars = ["A", "C", "G", "T"]


class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: list[str]) -> int:
        result: int | None = None

        bank_set = set(bank)

        visited: set[str] = set(startGene)

        queue = deque([(startGene, 0)])

        while queue:
            gene, num = queue.popleft()

            visited.add(gene)

            if gene == endGene:
                result = min(result, num) if result is not None else num
                continue

            for index in range(len(gene)):  # pylint: disable=consider-using-enumerate
                for char in chars:
                    if char == gene[index]:
                        continue

                    mutated = gene[:index] + char + gene[index + 1 :]  # noqa: E203

                    if mutated in visited:
                        continue

                    if mutated in bank_set:
                        queue.append((mutated, num + 1))

        return -1 if result is None else result


solution = Solution()


test(
    solution.minMutation,
    [
        {
            "input": ["AACCGGTT", "AACCGGTA", ["AACCGGTA"]],
            "expected": 1,
        },
        {
            "input": ["AACCGGTT", "AAACGGTA", ["AACCGGTA", "AACCGCTA", "AAACGGTA"]],
            "expected": 2,
        },
        {
            "input": [
                "AACCGGTT",
                "AAACGGTA",
                ["AACCGATT", "AACCGATA", "AAACGATA", "AAACGGTA"],
            ],
            "expected": 4,
        },
        {
            "input": ["AAAAAAAA", "ACAAAAAA", ["CAAAAAAA", "CCAAAAAA", "ACAAAAAA"]],
            "expected": 1,
        },
    ],
)
