// https://leetcode.com/problems/valid-parentheses/

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

const isValid = (str) => {
  const stack = [];

  const map = { ')': '(', '}': '{', ']': '[' };

  const closing = new Set(Object.keys(map));
  const opened = new Set(Object.values(map));

  let i = 0;

  while (i < str.length) {
    const current = str[i];

    if (!opened.has(current) && !closing.has(current)) {
      continue;
    }

    if (opened.has(current)) {
      stack.push(current);
    }

    if (closing.has(current)) {
      const tail = stack.pop();

      if (map[current] !== tail) {
        return false;
      }
    }

    i++;
  }

  return !stack.length;
};

console.log(isValidBoard('()[]{})'));
