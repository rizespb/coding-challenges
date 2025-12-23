// https://leetcode.com/problems/combination-sum/

const combinationSum = (candidates, target) => {
  const result = new Set();

  const inner = (sum, str) => {
    if (sum === target) {
      result.add(
        str
          .split('_')
          .map(Number)
          .sort((a, b) => a - b)
          .join('_')
      );

      return;
    }

    if (sum > target) {
      return;
    }

    for (let i = 0; i < candidates.length; i++) {
      const current = candidates[i];

      inner(sum + current, str.length ? `${str}_${current}` : `${current}`);
    }
  };

  inner(0, '');

  return Array.from(result).map((item) => item.split('_').map(Number));
};

console.log(combinationSum([2, 3, 6, 7], 7)); // [[2,2,3], [7]]
console.log(combinationSum([2, 3, 5], 8)); // [[2,2,2,2], [2,3,3], [3,5]]
