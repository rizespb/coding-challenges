// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/

const lowestCommonAncestor = (root, node1, node2) => {
  const targets = [node1, node2];

  if (!root || targets.includes(root)) {
    return root;
  }

  const inner = (node) => {
    const isTargetNode = targets.includes(node);

    const left = node?.left && inner(node.left);
    const right = node?.right && inner(node.right);

    // Если в левом и правом потомках есть по целевой ноде,
    // Значит текущая нода - искомая общая нода
    if (left && right) {
      return node;
    }

    // Если текущая нода является одной из целевых
    // То возвращаем node. Значит искомая общая нода где-то выше по дереву
    if (isTargetNode) {
      return node;
    }

    // Если пока совпадений нет, то ищем общую ноду вначале в левом поддереве, затем - в правом
    return left || right;
  };

  return inner(root);
};
