// https://leetcode.com/problems/binary-tree-level-order-traversal/

const levelOrder = (root) => {
  if (!root) return [];

  const result = [];

  let stack = [root];

  let newStack = [];

  let nums = [];

  while (stack.length) {
    const { val, left, right } = stack.pop();

    nums.push(val);

    left && newStack.push(left);
    right && newStack.push(right);

    if (stack.length === 0) {
      stack = newStack.toReversed();
      newStack = [];

      result.push(nums);
      nums = [];
    }
  }

  return result;
};
