// https://leetcode.com/problems/is-subsequence/

const { test } = require('../test');

const isSubsequence = (substr, str) => {
  const strLength = str.length;
  const substrLength = substr.length;

  if (strLength < substrLength) return false;

  let index = 0;

  for (let i = 0; i < strLength; i++) {
    if (str[i] === substr[index]) {
      index++;
    }

    if (index === substrLength) {
      return true;
    }
  }

  return index === substrLength;
};

test(isSubsequence, [
  {
    input: ['abc', 'ahbgdc'],
    expected: true,
  },
  {
    input: ['axc', 'ahbgdc'],
    expected: false,
  },
]);
