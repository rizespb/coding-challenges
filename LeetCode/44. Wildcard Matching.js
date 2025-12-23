// https://leetcode.com/problems/wildcard-matching/description/

// РЕШЕНИЕ НЕ ПРОХОДИТ ТЕСТЫ ПО ВРЕМЕНИ

// * соответствует любому символу, повторенному неограниченное количество раз, в том числе пустой строке
// ? соответствует любому одному символу
const isMatch = (str, pattern) => {
  if (pattern === '') {
    return str === '' ? true : false;
  }

  // Если паттерн состоит только из * ('*...*')
  if ([...pattern].every((char) => char === '*')) {
    return true;
  }

  let strIndex = 0;
  let patternIndex = 0;

  while (strIndex < str.length && patternIndex < pattern.length) {
    let char = str[strIndex];
    let patternSymbol = pattern[patternIndex];

    if (char === patternSymbol) {
      strIndex++;
      patternIndex++;

      continue;
    }

    if (patternSymbol === '?') {
      strIndex++;
      patternIndex++;

      continue;
    }

    if (patternSymbol === '*') {
      if (patternIndex === pattern.length - 1) {
        return true;
      }

      for (let i = strIndex; i < str.length; i++) {
        const subString = str.slice(i);

        const result = isMatch(subString, pattern.slice(patternIndex + 1));

        if (result) {
          return true;
        }
      }

      return false;
    }

    return false;
  }

  // Для случая, когда в конце pattern остаются символы, но все эти символы *
  if (patternIndex < pattern.length && [...pattern].slice(patternIndex).every((char) => char === '*')) {
    return true;
  }

  return strIndex === str.length && patternIndex === pattern.length;
};

console.log(isMatch('aa', 'a')); // false
console.log(isMatch('aa', '*')); // true
console.log(isMatch('cb', '?a')); // false
console.log(isMatch('adceb', '*a*b')); // true
console.log(isMatch('acdcb', 'a*c?b')); // false
console.log(isMatch('aa', 'a*')); // true
console.log(isMatch('abczzzde', 'abc???de*')); // true
console.log(isMatch('a', '')); // false
