# https://leetcode.com/problems/generate-parentheses/description/
class Solution:
    def generateParenthesis(self, num: int):
        result = []

        def inner(str, opened, closed):
            if len(str) == num * 2:
                result.append(str)

                return

            if opened < num:
                inner(str + "(", opened + 1, closed)

            if closed < opened:
                inner(str + ")", opened, closed + 1)

        inner("", 0, 0)

        return result


solution = Solution()

print(
    "Result is: ", solution.generateParenthesis(3)
)  # ["((()))","(()())","(())()","()(())","()()()"]
print("Result is: ", solution.generateParenthesis(1))  # ["()"]
