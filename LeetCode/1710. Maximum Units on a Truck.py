# https://leetcode.com/problems/maximum-units-on-a-truck/description/

from test import test


class Solution:
    def maximumUnits(self, boxTypes: list[list[int]], truckSize: int) -> int:
        boxTypes.sort(key=lambda box: box[1], reverse=True)

        rest_boxes_size = truckSize

        total_units = 0

        index = 0
        while rest_boxes_size > 0:
            box = boxTypes[index]

            box_amount = min(rest_boxes_size, box[0])

            total_units += box_amount * box[1]
            rest_boxes_size -= box_amount
            index += 1

        return total_units


solution = Solution()


test(
    solution.maximumUnits,
    [
        {
            "input": [[[1, 3], [2, 2], [3, 1]], 4],
            "expected": 8,
        },
        {
            "input": [[[5, 10], [2, 5], [4, 7], [3, 9]], 10],
            "expected": 91,
        },
    ],
)
