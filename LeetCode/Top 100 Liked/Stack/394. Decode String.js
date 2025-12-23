// https://leetcode.com/problems/decode-string/description/

// Given an encoded string, return its decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

// You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

// The test cases are generated so that the length of the output will never exceed 105.

const decodeString = (str) => {
  const stack = [''];
  const factors = [];

  let i = 0;

  while (i < str.length) {
    const current = str[i];

    if (current === '[') {
      stack.push('');
    } else if (current === ']') {
      const text = stack.pop();

      const factor = Number(factors.pop());

      // Добавляем к строке на вершине стэка новую строку
      stack[stack.length - 1] = stack[stack.length - 1] + text.repeat(factor);
    } else if (isNaN(Number(current))) {
      const text = stack.pop() + current;

      stack.push(text);
    } else {
      if (isNaN(Number(str[i - 1]))) {
        factors.push(current);
      } else {
        const factor = factors.pop() + current;

        factors.push(factor);
      }
    }

    i++;
  }

  return stack[0];
};

console.log(decodeString('3[a]2[bc]')); // aaabcbc

console.log(decodeString('3[a2[c]]')); // accaccacc

console.log(decodeString('2[abc]3[cd]ef')); // abcabccdcdcdef

console.log(decodeString('aa3[z]2[2[y]pq4[2[jk]e1[f]]]ef')); // aazzzyypqjkjkefjkjkefjkjkefjkjkefyypqjkjkefjkjkefjkjkefjkjkefef
