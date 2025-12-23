# https://leetcode.com/problems/string-compression/description/


class Solution:
    def compress(self, chars) -> int:
        index = 0

        currentCount = 0

        length = len(chars)

        for i in range(length):
            currentCount += 1

            if i < length - 1 and chars[i] == chars[i + 1]:
                continue

            chars[index] = chars[i]

            if currentCount != 1:
                currentCountStr = str(currentCount)

                for digit in currentCountStr:
                    index += 1

                    chars[index] = digit

            currentCount = 0
            index += 1

        charsSpliced = chars[0:index:]

        return len(charsSpliced)


solution = Solution()

solution.compress(["a", "a", "b", "b", "c", "c", "c"])
# 6 -> [ 'a', '2', 'b', '2', 'c', '3' ]
solution.compress(["a"])
# 1 -> [ 'a' ]
solution.compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"])
# 4 -> [ 'a', 'b', '1', '2' ]
