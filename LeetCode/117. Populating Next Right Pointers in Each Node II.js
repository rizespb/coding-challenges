// https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/

const connect = (root) => {
  if (!root) return root;

  const stack = [root];

  while (stack.length) {
    const length = stack.length;

    for (let i = 0; i < length; i++) {
      const current = stack.shift();

      const { left, right } = current;

      if (i < length - 1) current.next = stack[0];

      left && stack.push(left);
      right && stack.push(right);
    }
  }

  return root;
};

const { 0: state, 1: setState } = useState(0);
