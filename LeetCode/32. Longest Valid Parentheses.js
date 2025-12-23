// https://leetcode.com/problems/longest-valid-parentheses/description/

const longestValidParentheses = (str) => {
  const stack = [];
  const result = Array.from({ length: str.lentgh }).fill(0);

  for (let i = 0; i < str.length; i++) {
    const current = str[i];

    if (current === '(') {
      // Помещаем в стек индекс текущей открывающей скобки
      stack.push(i);

      continue;
    }

    const top = stack.pop();

    if (top !== undefined) {
      result[top] = 1;
      result[i] = 1;
    }
  }

  let maxLength = 0;
  let currentLength = 0;

  for (let i = 0; i < result.length; i++) {
    if (result[i] === 1) {
      currentLength++;
      continue;
    }

    maxLength = Math.max(currentLength, maxLength);

    currentLength = 0;
  }

  maxLength = Math.max(currentLength, maxLength);

  return maxLength;
};

console.log(longestValidParentheses('(()')); // 2
console.log(longestValidParentheses(')()())')); // 4
