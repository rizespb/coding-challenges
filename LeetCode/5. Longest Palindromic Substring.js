// https://leetcode.com/problems/longest-palindromic-substring/description/

const { test } = require('../../test');

const longestPalindrome = (str) => {
  let range;

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      let right = i + 1;
      let left = i;

      while (left >= 0 && right < str.length && str[left] === str[right]) {
        if (!range || range[1] - range[0] < right - left) {
          console.log('1', left, right);
          range = [left, right];
        }

        left--;
        right++;
      }
    }

    if (str[i - 1] === str[i + 1]) {
      let right = i + 1;
      let left = i - 1;

      while (left >= 0 && right < str.length && str[left] === str[right]) {
        if (!range || range[1] - range[0] < right - left) {
          range = [left, right];
        }

        left--;
        right++;
      }
    }
  }

  return range ? str.substring(range[0], range[1] + 1) : str[0];
};

test(longestPalindrome, [
  {
    input: ['babad'],
    expected: 'bab',
  },
  {
    input: ['cbbd'],
    expected: 'bb',
  },
  {
    input: ['aaaa'],
    expected: 'aaaa',
  },
  {
    input: ['ccc'],
    expected: 'ccc',
  },
]);
