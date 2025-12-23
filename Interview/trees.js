function printVerticalTree(root) {
  if (!root) {
    console.log('(empty tree)');
    return;
  }

  // Вспомогательная функция для получения высоты дерева
  function getHeight(node) {
    if (!node) return 0;
    return 1 + Math.max(getHeight(node.left), getHeight(node.right));
  }

  const height = getHeight(root);
  const width = Math.pow(2, height) - 1; // ширина последнего уровня
  const lines = Array(height)
    .fill()
    .map(() => Array(width).fill(' '));

  // Заполняем массив lines рекурсивно
  function fill(node, level, left, right) {
    if (!node) return;
    const mid = Math.floor((left + right) / 2);
    lines[level][mid] = String(node.value);
    fill(node.left, level + 1, left, mid - 1);
    fill(node.right, level + 1, mid + 1, right);
  }

  fill(root, 0, 0, width - 1);

  // Выводим построчно
  lines.forEach((line) => console.log(line.join('')));
}

class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const root = new TreeNode(
  1,
  // Левое поддерево (глубина до 5)
  new TreeNode(
    2,
    new TreeNode(
      4,
      new TreeNode(
        8,
        new TreeNode(16) // уровень 5
      ),
      new TreeNode(9) // лист на уровне 4
    ),
    new TreeNode(
      5,
      null,
      new TreeNode(
        10,
        null,
        new TreeNode(20) // уровень 5
      )
    )
  ),
  // Правое поддерево (лист на уровне 3)
  new TreeNode(
    3,
    new TreeNode(6), // лист на уровне 3
    new TreeNode(
      7,
      new TreeNode(14), // лист на уровне 4
      null
    )
  )
);

printVerticalTree(root);

// Прямой обход (Pre-order)
const preOrder = (root) => {
  if (!root) {
    // return;
    return [];
  }

  // root?.left && traverseTree(root.left);
  // console.log(root.value);
  // root?.right && traverseTree(root.right);

  return [root.value, ...preOrder(root.left), ...preOrder(root.right)];
};

// Симметричный обход (In-order)
const inOrder = (root) => {
  if (!root) {
    // return;
    return [];
  }

  return [...inOrder(root.left), root.value, ...inOrder(root.right)];
};

// Обратный обход (Post-order)
const postOrder = (root) => {
  if (!root) {
    // return;
    return [];
  }

  return [...postOrder(root.left), ...postOrder(root.right), root.value];
};

// Уровневый обход (Post-order)
const levelOrder = (root) => {
  if (!root) {
    return;
  }

  const result = [];

  const stack = [root];

  while (stack.length) {
    const node = stack.shift();

    // console.log(node.value);
    result.push(node.value);

    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }

  return result;
};

console.log(levelOrder(root));
