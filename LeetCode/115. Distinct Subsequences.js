// https://leetcode.com/problems/distinct-subsequences/description/

// Решение не проходит тесты по времени

const numDistinct = (str, target) => {
  let count = 0;

  const inner = (subseq, start) => {
    if (subseq.length >= target.length) {
      return;
    }

    for (let i = start; i < str.length; i++) {
      const newSubseq = subseq + str[i];

      if (newSubseq === target) {
        count++;
        continue;
      }

      if (target.startsWith(newSubseq)) {
        inner(newSubseq, i + 1);
      }
    }
  };

  inner('', 0);

  return count;
};

numDistinct('rabbbit', 'rabbit'); // 3
numDistinct('babgbag', 'bag'); // 5
numDistinct(
  'adbdadeecadeadeccaeaabdabdbcdabddddabcaaadbabaaedeeddeaeebcdeabcaaaeeaeeabcddcebddebeebedaecccbdcbcedbdaeaedcdebeecdaaedaacadbdccabddaddacdddc',
  'bcddceeeebecbc'
);
