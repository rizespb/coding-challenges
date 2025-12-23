// https://leetcode.com/problems/roman-to-integer/description/

const map = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const substractionMap = {
  V: 'I',
  X: 'I',
  L: 'X',
  C: 'X',
  D: 'C',
  M: 'C',
};

const romanToInt = (str) => {
  let sum = 0;

  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    const next = str[i + 1];

    const shouldSubstract = next && substractionMap[next] === current;

    if (shouldSubstract) {
      const currentValue = map[next] - map[current];
      sum += currentValue;

      i++;
    } else {
      sum += map[current];
    }
  }

  return sum;
};

console.log(romanToInt('III')); // 3
console.log(romanToInt('LVIII')); // 58
console.log(romanToInt('MCMXCIV')); // 1994
