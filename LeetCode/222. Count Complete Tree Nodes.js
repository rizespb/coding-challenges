// https://leetcode.com/problems/count-complete-tree-nodes/description/

// const countNodes = (root) => {
//   if (!root) return 0;

//   const stack = [root];

//   let count = 0;

//   while (stack.length) {
//     const node = stack.pop();
//     count++;

//     node.left && stack.push(node.left);
//     node.right && stack.push(node.right);
//   }

//   return count;
// };

const countNodes = (root) => {
  if (!root) return 0;

  return root ? 1 + countNodes(root.left) + countNodes(root.right) : 0;
};
