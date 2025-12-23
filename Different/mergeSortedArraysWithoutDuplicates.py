# Даны два массива целых чисел. Массивы отсортированы по возрастанию. Вывести объединение без дублей, сохранив сортировку и использовав константу дополнительной памяти.

from sys import maxsize


class Solution:
    def maxSumSubarrayWithTwoUnique(self, nums: list[int]) -> int | str:
        if len(nums) == 0:
            return "Empty list"

        max_sum = -maxsize - 1

        right = 0
        left = 0

        my_dict: dict[int, int] = {}

        current_sum = 0

        queue: list[int] = []

        while right < len(nums):
            current = nums[right]

            if current not in my_dict:
                queue.append(current)

            if len(queue) == 2 and current == queue[0]:
                queue.pop(0)
                queue.append(current)

            if len(queue) > 2:
                num_to_delete = queue.pop(0)

                index = my_dict[num_to_delete]

                while left <= index:
                    current_sum -= nums[left]
                    left += 1

                del my_dict[num_to_delete]

            my_dict[current] = right

            current_sum += current
            max_sum = max(max_sum, current_sum)

            right += 1

        return max_sum


solution = Solution()


def test(callback, cases):
    for case in cases:
        input_value = case["input"]
        expected_value = case["expected"]

        result = callback(*input_value)

        print("input", input_value)
        print("result", result)
        print("expected", expected_value)

        print(
            "\x1b[32mPassed\x1b[0m"
            if expected_value == result
            else "\x1b[31mFailed\x1b[0m"
        )

        print("-----------------------------------")


test(
    solution.maxSumSubarrayWithTwoUnique,
    [
        {
            "input": [[1, 2, 3, 2, 2]],
            "expected": 9,
        },
        {
            "input": [[5, 5, 5, 5]],
            "expected": 20,
        },
        {
            "input": [[3, 3, 2, 2, 3]],
            "expected": 13,
        },
        {
            "input": [[1, 2, 3, 4, 5]],
            "expected": 9,
        },
        {
            "input": [[10]],
            "expected": 10,
        },
        {
            "input": [[2, 2, 2]],
            "expected": 6,
        },
        {
            "input": [[-1, -2, -3, -2, -2]],
            "expected": -1,
        },
        {
            "input": [[1, 2, 1, 3, 4, 3, 5, 3, 3, 2, 1]],
            "expected": 14,
        },
    ],
)
