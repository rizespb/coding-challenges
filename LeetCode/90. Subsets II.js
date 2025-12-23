// https://leetcode.com/problems/subsets-ii/description/

const subsetsWithDup = (nums) => {
  nums.sort((a, b) => a - b);
  const result = [];

  const inner = (arr = [], start = 0) => {
    result.push([...arr]);

    for (let i = start; i < nums.length; i++) {
      if (i !== start && nums[i] === nums[i - 1]) continue;

      arr.push(nums[i]);

      inner(arr, i + 1);

      arr.pop();
    }
  };

  inner();
  return result;
};

subsetsWithDup([1, 2, 2]); // [[],[1],[1,2],[1,2,2],[2],[2,2]]
subsetsWithDup([0]); // [[],[0]]
