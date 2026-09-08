// https://leetcode.com/problems/minimum-absolute-difference-in-bst/description/
const { test } = require('../test');

const getMinimumDifference = (node) => {
  let min = Number.POSITIVE_INFINITY;

  let prev = null;

  const dfs = (node) => {
    if (!node) return;

    if (prev) {
      min = Math.min(min, Math.abs(prev.val - node.val));
    }

    prev = node;

    dfs(node.left);
    prev = node;
    dfs(node.right);
  };

  dfs(node);

  return min;
};
