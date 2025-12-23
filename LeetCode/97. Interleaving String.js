// https://leetcode.com/problems/interleaving-string/description/

// Решение не проходит тесты по времени
const isInterleave = (str1, str2, str3) => {
  if (str1.length + str2.length !== str3.length) return false;

  const cache = new Map();

  const inner = (start1 = 0, start2 = 0, start3 = 0) => {
    const key = `${start1}_${start2}_${start3}`;

    if (cache.get(key) !== undefined) return cache.get(key);

    let index1 = start1;
    let index2 = start2;
    let index3 = start3;

    while (index3 < str3.length) {
      const value1 = str1[index1];
      const value2 = str2[index2];
      const value3 = str3[index3];

      if (value1 === value3 && value2 === value3) {
        return inner(index1 + 1, index2, index3 + 1) || inner(index1, index2 + 1, index3 + 1);
      } else if (value1 === value3) {
        index1++;
        index3++;

        continue;
      } else if (value2 === value3) {
        index2++;
        index3++;

        continue;
      }

      const key = `${start1}_${start2}_${start3}`;
      cache.set(key, false);

      return false;
    }

    return true;
  };

  return inner();
};

console.log(isInterleave('aabcc', 'dbbca', 'aadbbcbcac')); // true
console.log(isInterleave('aabcc', 'dbbca', 'aadbbbaccc')); // false
console.log(isInterleave('', '', '')); // true
console.log(
  isInterleave(
    'bbbbbabbbbabaababaaaabbababbaaabbabbaaabaaaaababbbababbbbbabbbbababbabaabababbbaabababababbbaaababaa',
    'babaaaabbababbbabbbbaabaabbaabbbbaabaaabaababaaaabaaabbaaabaaaabaabaabbbbbbbbbbbabaaabbababbabbabaab',
    'babbbabbbaaabbababbbbababaabbabaabaaabbbbabbbaaabbbaaaaabbbbaabbaaabababbaaaaaabababbababaababbababbbababbbbaaaabaabbabbaaaaabbabbaaaabbbaabaaabaababaababbaaabbbbbabbbbaabbabaabbbbabaaabbababbabbabbab'
  )
); // false
