// https://leetcode.com/problems/sum-root-to-leaf-numbers/description/

// const sumNumbers = (root) => {
//   const inner = (node, sum) => {
//     if (!node) {
//       return 0;
//     }

//     if (!node.left && !node.right) {
//       return Number(sum + node.val);
//     }

//     return inner(node.left, sum + node.val) + inner(node.right, sum + node.val);
//   };

//   return inner(root, '');
// };

const sumNumbers = (node, sum = '') => {
  if (!node) {
    return 0;
  }

  if (!node.left && !node.right) {
    return Number(sum + node.val);
  }

  return sumNumbers(node.left, sum + node.val) + sumNumbers(node.right, sum + node.val);
};
