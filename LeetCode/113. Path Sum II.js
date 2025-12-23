// https://leetcode.com/problems/path-sum-ii/description/

const pathSum = (root, targetSum) => {
  const results = [];

  if (!root) return results;

  const current = [];

  const inner = (node, sum = 0) => {
    const { left, right, val } = node;

    if (!left && !right && sum + val === targetSum) {
      results.push([...current, val]);

      return;
    }

    current.push(node.val);

    if (left) {
      inner(left, sum + val);
    }

    if (right) {
      inner(right, sum + val);
    }

    current.pop();
  };

  inner(root, 0);

  return results;
};
