// https://leetcode.com/problems/reverse-words-in-a-string-iii/

const { test } = require('../test');

const reverseWords = (str) => {
  let temp = '';

  let result = '';

  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      result += temp + ' ';
      temp = '';

      continue;
    }

    temp = str[i] + temp;
  }

  result += temp;

  return result;
};

test(reverseWords, [
  {
    input: ["Let's take LeetCode contest"],
    expected: "s'teL ekat edoCteeL tsetnoc",
  },
  {
    input: ['Mr Ding'],
    expected: 'rM gniD',
  },
]);
