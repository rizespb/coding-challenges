// https://leetcode.com/problems/recover-binary-search-tree/description/

// Обходим дерево inorder - сначала левый потомок, потом нода, потом правый потомок
// При таком обходе в BST prev.val всегда должжен быть меньше текущей ноды
// Если мы нашил несоответствие, то значит мы нашли две неправильные ноды.
// Но, возможно, вторая нода не является неправильной. Нужной второй "неправильной" нодой будет последняя найденная "неправильная нода"
// Запись second = node каждый раз гарантирует, что мы получим последний неверный элемент.
const recoverTree = (root) => {
  let first = null;
  let second = null;
  let prev = null;

  const inorder = (node) => {
    if (!node) return;

    inorder(node.left);

    if (prev && prev.val > node.val) {
      if (!first) {
        first = prev;
      }

      second = node;
    }

    prev = node;

    inorder(node.right);
  };

  inorder(root);

  if (first && second) {
    const temp = first.val;
    first.val = second.val;
    second.val = temp;
  }

  return root;
};
