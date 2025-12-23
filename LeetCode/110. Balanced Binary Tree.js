// https://leetcode.com/problems/balanced-binary-tree/description/

const isBalanced = (root) => {
  if (!root) return true;

  let isBalancedTree = true;

  const inner = (node) => {
    if (!node) return 0;

    let leftDepth = inner(node.left);
    let rightDepth = inner(node.right);

    if (Math.abs(leftDepth - rightDepth) > 1) {
      isBalancedTree = false;
    }

    return Math.max(leftDepth, rightDepth) + 1;
  };

  inner(root);

  return isBalancedTree;
};
