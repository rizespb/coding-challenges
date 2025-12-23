// https://leetcode.com/problems/validate-binary-search-tree/

const isValidBST = (root, max = Infinity, min = -Infinity) => {
  if (!root) return true;

  const { left, right, val } = root;

  if (val >= max || val <= min) {
    return false;
  }

  return isValidBST(left, val, min) && isValidBST(right, max, val);
};
