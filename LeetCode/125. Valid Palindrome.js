// https://leetcode.com/problems/valid-palindrome/description/

const isPalindrome = (str) => {
  const serialized = str.replaceAll(/\W|_/gi, '').toLowerCase();

  return serialized === serialized.split('').reverse().join('');
};

console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car')); // false
console.log(isPalindrome(' ')); // true
