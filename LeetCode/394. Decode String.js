// https://leetcode.com/problems/decode-string/description/

const { test } = require('../test');

const decodeString = (str) => {
  const stack = [];

  let current = '';
  let currentNum = '';

  for (const char of str) {
    if (char >= '0' && char <= '9') {
      currentNum += char;

      continue;
    }

    if (char === '[') {
      stack.push(current);
      current = '';

      stack.push(Number(currentNum));
      currentNum = '';

      continue;
    }

    if (char === ']') {
      const num = stack.pop();
      const addedStr = current.repeat(num);

      current = stack.pop() + addedStr;

      continue;
    }

    current += char;
  }

  return current;
};

test(decodeString, [
  {
    input: ['3[a]2[bc]'],
    expected: 'aaabcbc',
  },
  {
    input: ['3[a2[c2[b]]]'],
    expected: 'acbbcbbacbbcbbacbbcbb',
  },
  {
    input: ['2[abc]3[cd]ef'],
    expected: 'abcabccdcdcdef',
  },
  {
    input: ['100[leetcode]'],
    expected: 'leetcode'.repeat(100),
  },
  {
    input: ['3[z]2[2[y]pq4[2[jk]e1[f]]]ef'],
    expected: 'zzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef',
  },
]);
