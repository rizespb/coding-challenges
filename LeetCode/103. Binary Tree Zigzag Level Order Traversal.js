// https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/

const zigzagLevelOrder = (root) => {
  const result = [];

  if (!root) return result;

  stack = [root];

  let isLeftToRight = true;

  while (stack.length) {
    const length = stack.length;

    const currentArray = [];

    for (let i = 0; i < length; i++) {
      const node = stack.shift();

      currentArray.push(node.val);

      if (isLeftToRight) {
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
      } else {
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
      }
    }

    result.push(currentArray);

    isLeftToRight = !isLeftToRight;
    stack.reverse();
  }

  return result;
};
