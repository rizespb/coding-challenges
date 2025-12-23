// https://leetcode.com/problems/find-all-anagrams-in-a-string/

// Given two strings s and p, return an array of all the start indices of p's
// anagrams
//  in s. You may return the answer in any order.

const findAnagrams = (str, test) => {
  const map = {};

  const result = [];

  for (let i = 0; i < test.length; i++) {
    const current = test[i];

    map[current] = (map[current] || 0) + 1;
  }

  let count = test.length;

  for (let i = 0; i < test.length; i++) {
    const current = str[i];

    if (map[current] !== undefined) {
      map[current]--;
      map[current] >= 0 && count--;
    }
  }

  if (count === 0) {
    result.push(0);
  }

  let left = 1;

  let right = test.length;

  while (right < str.length) {
    const prevLeftEl = str[left - 1];

    if (map[prevLeftEl] !== undefined) {
      map[prevLeftEl]++;
      map[prevLeftEl] > 0 && count++;
    }

    const rightEl = str[right];

    if (map[rightEl] !== undefined) {
      map[rightEl]--;
      map[rightEl] >= 0 && count--;
    }

    if (count === 0) {
      result.push(left);
    }

    left++;
    right++;
  }

  return result;
};

console.log(findAnagrams('cbaebabacd', 'abc')); // [3,3,5,5,6,7]
console.log(findAnagrams('abab', 'ab')); // [1]
