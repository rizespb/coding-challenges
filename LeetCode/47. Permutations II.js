// https://leetcode.com/problems/permutations-ii/description/

const permuteUnique = (nums) => {
  const results = new Set();

  const arr = [];

  const inner = (innerNums) => {
    if (arr.length === nums.length) {
      results.add(arr.join('_'));

      return;
    }

    for (let i = 0; i < innerNums.length; i++) {
      const newInnerNums = innerNums.slice(0, i).concat(innerNums.slice(i + 1));

      arr.push(innerNums[i]);

      inner(newInnerNums);

      arr.pop();
    }
  };

  inner(nums);

  return [...results].map((item) => item.split('_').map(Number));
};

console.log(permuteUnique([1, 1, 2])); // [[1, 1, 2], [1, 2, 1], [2, 1, 1]]
console.log(permuteUnique([1, 2, 3])); // [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
