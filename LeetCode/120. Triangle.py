# https://leetcode.com/problems/triangle/description/


# Перебираем ряды, начиная с предпоследнего и до самого первого
# Для каждого элемента ряда сохраняем минимальное значение: элемент + минимальный из двух элементов под ним
class Solution:
    def minimumTotal(self, triangle) -> int:
        if len(triangle) == 1:
            return triangle[0][0]

        numberOfRows = len(triangle)

        temp = list(triangle[numberOfRows - 1])

        for row in triangle[numberOfRows - 2 :: -1]:

            for index, value in enumerate(row):
                temp[index] = value + min(temp[index], temp[index + 1])

        return temp[0]
