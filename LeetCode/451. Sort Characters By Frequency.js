// https://leetcode.com/problems/sort-characters-by-frequency/description/

const { test } = require('../test');

// Решение 1
// O(n log n) - фактически, более быстрое
const frequencySort = (str) => {
  const map = {};

  for (const char of str) {
    const lower = char;
    map[lower] = (map[lower] ?? 0) + 1;
  }

  const sorted = Object.entries(map).sort(([_keyA, valueA], [_keyB, valueB]) => valueB - valueA);

  return sorted.map(([key, value]) => key.repeat(value)).join('');
};

// Решение 2
// O(n) - фактически, более медленное
// const frequencySort = (str) => {
//   const map = {};

//   for (const char of str) {
//     const lower = char;
//     map[lower] = (map[lower] ?? 0) + 1;
//   }

//   const buckets = Array.from({ length: str.length + 1 }, () => []);

//   for (const [key, value] of Object.entries(map)) {
//     buckets[value].push(key);
//   }

//   let result = '';

//   for (let index = buckets.length - 1; index >= 0; index--) {
//     if (buckets[index].length) {
//       for (const char of buckets[index]) {
//         result += char.repeat(index);
//       }
//     }
//   }

//   return result;
// };

test(frequencySort, [
  {
    input: ['trecec'],
    expected: 'eert',
  },
  {
    input: ['cccaaa'],
    expected: 'aaaccc',
  },
  {
    input: ['Aabb'],
    expected: 'bbAa',
  },
]);
