// https://leetcode.com/problems/reverse-words-in-a-string/description/

const { test } = require('../test');

// Второе решение быстрее

// const reverseWords = (str) => {
//   let currentWord = '';

//   let result = '';

//   for (let i = 0; i < str.length; i++) {
//     const char = str[i];

//     if (char !== ' ') {
//       currentWord += char;

//       if (i !== str.length - 1) {
//         continue;
//       }
//     }

//     if (!currentWord) {
//       continue;
//     }

//     if (result) {
//       result = ' ' + result;
//     }

//     result = currentWord + result;

//     currentWord = '';
//   }

//   return result;
// };

const reverseWords = (str) => str.split(' ').filter(Boolean).reverse().join(' ');

test(reverseWords, [
  {
    input: ['the sky is blue'],
    expected: 'blue is sky the',
  },
  {
    input: ['  hello world  '],
    expected: 'world hello',
  },
  {
    input: ['a good   example'],
    expected: 'example good a',
  },
]);
