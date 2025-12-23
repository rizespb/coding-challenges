// https://leetcode.com/problems/range-sum-of-bst/description/

const rangeSumBST = (root, low, high) => {
  let sum = 0;

  if (!root) return sum;

  const inner = (node) => {
    const { val, left, right } = node;

    if (val >= low && val <= high) {
      sum += val;
    }

    val > low && left && inner(left);
    val < high && right && inner(right);
  };

  inner(root);

  return sum;
};
