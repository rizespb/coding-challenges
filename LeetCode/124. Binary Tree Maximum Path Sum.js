// https://leetcode.com/problems/binary-tree-maximum-path-sum/description/

class TreeNode {
  constructor(value, left = null, right = null) {
    this.val = value;
    this.left = left;
    this.right = right;
  }
}

const maxPathSum = (root) => {
  let maxPath = Number.NEGATIVE_INFINITY;

  const inner = (node) => {
    if (!node) return Number.NEGATIVE_INFINITY;

    const leftSum = inner(node.left);
    const rightSum = inner(node.right);

    // Выбираем максимальный среди возможных путей в ноде:
    // 1. Сама нода без потомков
    // 2. Путь через ноду и левого потомка
    // 3. Путь через ноду и правого потомка
    const throughNodeMaxPath = Math.max(node.val, node.val + leftSum, node.val + rightSum);

    // 4. Плюс путь из левого потомка через ноду в правого потомка (без захода выше в родителя)
    const nodeMaxPath = node.val + leftSum + rightSum;

    maxPath = Math.max(maxPath, throughNodeMaxPath, nodeMaxPath);

    // Для учета в родителе возвращаем максимальный путь ЧЕРЕЗ текущую ноду
    return throughNodeMaxPath;
  };

  inner(root);

  return maxPath;
};

const root = new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
const root1 = new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));

console.log(maxPathSum(root)); // 42
