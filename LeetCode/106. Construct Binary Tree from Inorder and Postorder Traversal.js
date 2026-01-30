// https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/?envType=study-plan-v2&envId=top-interview-150

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// Решение 1 (целиком моё)

// inorder -> левое поддерево -> корень -> правое поддерево
// postorder -> левое поддерево -> правое поддерево -> корень

// В основе лежит идея:
// В массиве postorder последний элемент - это всегда вершина текущего поддерева (изначально - это root)
// Когда извлекаем последний элемент, то это явно или root (на первой итерации), или вершина поддерева - потомка предыдущей вершины
// Остается определить, какой это потомок - левый или правый
// Узнать, левый или правый потомок, нам поможет inorder: все элементы правее рассматриваемого элемента - правое поддерево, левее - левое поддерево
// const buildTree = (inorder, postorder) => {
//   // Составляем карту индексов элементов в inorder
//   const map = {};

//   for (let i = 0; i < inorder.length; i++) {
//     map[inorder[i]] = i;
//   }

//   // Последний элемент в postorder всегда корень дерева (или поддерева)
//   const value = postorder.pop();

//   const root = new TreeNode(value);

//   // Извлекая элементы из postOrder мы будем смотреть на индекс родителя, чтобы отслеживать левые и правые поддеревья и моменты, когда надо остановиться с текущим поддеревом и перейти к левому потомку родителя
//   const inner = (node, parentIndex = Number.NEGATIVE_INFINITY) => {
//     if (!postorder.length || map[postorder.at(-1)] < parentIndex) {
//       return;
//     }

//     if (map[postorder.at(-1)] > map[node.val]) {
//       const rightValue = postorder.pop();

//       const right = new TreeNode(rightValue);
//       node.right = right;

//       inner(right, map[node.val]);
//     }

//     if (!postorder.length || map[postorder.at(-1)] < parentIndex) {
//       return;
//     }

//     const leftValue = postorder.pop();

//     const left = new TreeNode(leftValue);
//     node.left = left;

//     inner(left, parentIndex);

//     return node;
//   };

//   inner(root);

//   return root;
// };

// Решение 2 (с помощью Solutions)
const buildTree = (inorder, postorder) => {
  // Составляем карту индексов элементов в inorder
  const map = {};

  for (let i = 0; i < inorder.length; i++) {
    map[inorder[i]] = i;
  }

  const inner = (start, end) => {
    if (start > end) {
      return null;
    }

    const value = postorder.pop();
    const node = new TreeNode(value);

    node.right = inner(map[value] + 1, end);
    node.left = inner(start, map[value] - 1);

    return node;
  };

  return inner(0, inorder.length - 1);
};
