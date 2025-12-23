// https://leetcode.com/problems/minimum-window-substring/description/

// Given two strings s and t of lengths m and n respectively, return the minimum window
// substring
//  of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

const minWindow = (str, test) => {
  if (str.length < test.length || str.length === 0) {
    return '';
  }

  const testMap = {};

  for (const char of test) {
    testMap[char] = (testMap[char] || 0) + 1;
  }

  let count = test.length;

  let left = 0;
  let right = -1;

  let result = [];

  while (left < str.length && right < str.length - 1) {
    right++;
    const rightEl = str[right];

    if (testMap[rightEl] === undefined) {
      continue;
    }

    if (testMap[rightEl] > 0) {
      count--;
    }

    testMap[rightEl]--;

    if (count === 0) {
      while (count <= 0) {
        result.push({ left, right });

        const leftEl = str[left];

        testMap[leftEl]++;

        if (testMap[leftEl] > 0) {
          count++;
        }

        left++;
      }
    }
  }

  if (result.length === 0) {
    return '';
  }

  const min = result.reduce((acc, item) => {
    if (acc.right - acc.left > item.right - item.left) {
      return item;
    }

    return acc;
  });

  return str.slice(min.left, min.right + 1);
};

console.log(minWindow('ADOBECODEBANC', 'ABC')); // BANC
console.log(minWindow('ab', 'a')); // a
console.log(minWindow('ab', 'c')); // ""

// Более интуитивно понятное решение, но не проходит тесты по времени
// const minWindow = (str, test) => {
//   if (str.length < test.length) {
//     return '';
//   }

//   const testCharCount = {};

//   for (const char of test) {
//     testCharCount[char] = (testCharCount[char] || 0) + 1;
//   }

//   const isValid = (substring) => {
//     const substringCharCount = {};

//     for (const char of substring) {
//       substringCharCount[char] = (substringCharCount[char] || 0) + 1;
//     }

//     for (const key in testCharCount) {
//       if (!substringCharCount[key] || testCharCount[key] > substringCharCount[key]) {
//         return false;
//       }
//     }

//     return true;
//   };

//   let left = 0;
//   let right = 0;

//   let result;

//   while (left < str.length && right <= str.length) {
//     const substring = str.slice(left, right);

//     if (!isValid(substring)) {
//       right++;
//       continue;
//     }

//     result = !result || result.length > substring.length ? substring : result;

//     left++;
//   }

//   return result || '';
// };
