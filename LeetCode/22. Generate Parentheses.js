// https://leetcode.com/problems/generate-parentheses/description/

const generateParenthesis = (num) => {
  const result = [];

  const inner = (str, opened, closed) => {
    if (str.length === num * 2) {
      result.push(str);

      return;
    }

    if (opened < num) {
      inner(str + '(', opened + 1, closed);
    }

    if (closed < opened) {
      inner(str + ')', opened, closed + 1);
    }
  };

  inner('', 0, 0);

  return result;
};

console.log(generateParenthesis(3)); // ["((()))","(()())","(())()","()(())","()()()"]
console.log(generateParenthesis(1)); // ["()"]
