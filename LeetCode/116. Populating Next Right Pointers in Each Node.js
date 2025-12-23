// https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/

const connect = (root) => {
  if (!root) return root;

  const stack = [root];

  while (stack.length) {
    const length = stack.length;

    for (let i = 0; i < length; i++) {
      const current = stack.shift();

      if (i < length - 1) {
        current.next = stack[0];
      }

      current.left && stack.push(current.left);
      current.right && stack.push(current.right);
    }
  }

  return root;
};
