// https://leetcode.com/problems/minimum-depth-of-binary-tree/description/

const minDepth = (root) => {
  if (!root) return 0;

  let minDepth = Infinity;

  const inner = (node, depth = 0) => {
    if (!node.left && !node.right) {
      minDepth = Math.min(depth + 1, minDepth);

      return;
    }

    if (depth >= minDepth) {
      return;
    }

    node.left && inner(node.left, depth + 1);
    node.right && inner(node.right, depth + 1);
  };

  inner(root);

  return minDepth;
};
