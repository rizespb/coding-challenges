# https://leetcode.com/problems/simplify-path/description/
from test import test


class Solution:
    UP = ".."
    CURRENT = "."

    def simplifyPath(self, path: str) -> str:
        array = path.split("/")

        print(array)

        result: list[str] = []

        for segment in array:
            if segment == self.UP and result:
                result.pop()
            elif segment in [self.CURRENT, self.UP, ""]:
                continue
            else:
                result.append(segment)

        return "/" + "/".join(result)


solution = Solution()


test(
    solution.simplifyPath,
    [
        {
            "input": ["/home/"],
            "expected": "/home",
        },
        {
            "input": ["/home//foo/"],
            "expected": "/home/foo",
        },
        {
            "input": ["/home/user/Documents/../Pictures"],
            "expected": "/home/user/Pictures",
        },
        {
            "input": ["/../"],
            "expected": "/",
        },
        {
            "input": ["/.../a/../b/c/../d/./"],
            "expected": "/.../b/d",
        },
    ],
)
