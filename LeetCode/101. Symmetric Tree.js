// https://leetcode.com/problems/symmetric-tree/description/

const isSymmetric = (root) => {
  const isEqual = (node1, node2) => {
    if (node1 === null || node2 === null) return node1 === node2;

    if (node1.val !== node2.val) return false;

    return isEqual(node1.left, node2.right) && isEqual(node1.right, node2.left);
  };

  if (!root) return true;

  const { left, right } = root;

  return isEqual(left, right);
};
