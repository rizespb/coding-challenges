// https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/

const levelOrderBottom = (root) => {
  if (!root) return [];

  const result = [];

  const stack = [root];

  while (stack.length) {
    const length = stack.length;
    const currentResult = [];

    for (let i = 0; i < length; i++) {
      const { val, left, right } = stack.shift();

      left && stack.push(left);
      right && stack.push(right);

      currentResult.push(val);
    }

    result.push(currentResult);
  }

  return result.reverse();
};
