// ID успешной посылки 97795823

/*
-- ПРИНЦИП РАБОТЫ --

Для удлаения узла из дерева (фукнция remove) вначале найдем нужную вершину (рекурсивная функция findNode). Т.к. дерево является деревом поиска, максимальная сложность поиска вершины по ключу составит O(h), где h - высота дерева.
Функция findNode возвращает саму искомую ноду и ее родителя.

Если нода не найдена, значит мы ничего не делаем и просто возвращаем корень дерева. 

Если найденная нода (которую надо удалить) является корнем дерева, тогда удлаяем корень с помощью функции removeRoot.
Если у корня только один потомок, то возвращаем ссылку на этого потомка.
Если потомков нет - возвращаем null.
Если есть оба потомка, тогда с помощью функции findAndRemoveRightmostNodeInSubtree находим самого правого потомка в левом поддереве корня. Левое поддерево корня становится левым поддеревом найденной "самой правой вершины", правое поддерево - правым поддеревом "самой правой вершины".
И возвращаем "самую правую вершину", которая теперь является корнем дерева.

Функия findAndRemoveRightmostNodeInSubtree возвращает самую правую вершину из левого поддерева переданной ноды. Если у ближайшего левого потомка нет правого поддерева, значит этот левый потомок и будет искомой "самой правой вершиной" левого поддерева.
Возвращая самую правую ноду левого поддерева, findAndRemoveRightmostNodeInSubtree также удаляет эту ноду из дерева, устанвливая соответствующее значение ее родителя в null

Если найденная вершина "для удаления" не является корнем, тогда возможны несколько вариантов:
1. Если у ноды нет потомков, тогда просто устанавливаем соответствующее значение ее родителя в null
2. Если у ноды есть один потомок, тогда удаляем ноду соединяя родителя с потомком ноды (в соответствующее свойство родителя (left или right) записываем ссылку на потомка ноды)
3. У ноды есть два потомка. Тогда с помощью removeNode удаляем ноду. Внутри removeNode с помощью findAndRemoveRightmostNodeInSubtree находим самую правую вершину левого поддерева. И заменяем искомую вершину в дереве на найденную "самую правую вершину": в соответствующее свойство родителя (left или right) записываем ссылку на "самую правую вершину". В свойства right и left "самой правой вершины" записываем ссылки на соответствующих потомков удаляемой ноды

Возвращаем корень дерева


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Т.к. дерево является деревом поиска, максимальная сложность поиска вершины по ключу составит O(h), где h - высота дерева

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(n) дополнительной памяти (для создания узлов дерева)

*/

if (process.env.REMOTE_JUDGE !== 'true') {
  class Node {
    constructor(value, left = null, right = null) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }
}

// Найти ноду по ключу в дереве с корнем node
const findNode = (node, key, parent = null) => {
  if (!node) {
    return {
      targetNode: null,
      parent: null,
    };
  }

  if (node.value === key) {
    return {
      targetNode: node,
      parent,
    };
  }

  if (node.value > key) {
    return findNode(node.left, key, node);
  } else {
    return findNode(node.right, key, node);
  }
};

// Применяется для ноды subRoot, у которой точно есть правый и левый потомок
const findAndRemoveRightmostNodeInSubtree = (subRoot) => {
  let rightmostNode;

  // Если у левого потом вершины нет правого поддерева, значит этот левый потом и будет искомой "самой правой вершиной" в левом поддереве
  if (!subRoot.left.right) {
    rightmostNode = subRoot.left;

    // Удлаяем subRoot.left, соединяя subRoot.left с левым поддеревом левого ребенка
    subRoot.left = subRoot.left.left;

    return rightmostNode;
  }

  const findRight = (node, parent) => {
    if (!node.right) {
      // Удаяем ноду из дерева
      parent.right = node.left;

      return node;
    }

    return findRight(node.right, node);
  };

  rightmostNode = findRight(subRoot.left, subRoot);

  return rightmostNode;
};

const removeNode = (node, parent) => {
  const rightmostNode = findAndRemoveRightmostNodeInSubtree(node);

  const isLeftChild = node === parent.left;

  if (isLeftChild) {
    parent.left = rightmostNode;
  } else {
    parent.right = rightmostNode;
  }

  rightmostNode.left = node.left;
  rightmostNode.right = node.right;
};

const removeRoot = (root) => {
  // Если у root только один потомок, возвращаем его
  if (!root.right && root.left) {
    return root.left;
  }

  if (root.right && !root.left) {
    return root.right;
  }

  if (!root.right && !root.left) {
    return null;
  }

  const rightmostNode = findAndRemoveRightmostNodeInSubtree(root);

  rightmostNode.right = root.right;
  rightmostNode.left = root.left;

  return rightmostNode;
};

function remove(root, key) {
  if (!root) {
    return root;
  }

  // Находим ноду, которую надо удалить
  const { targetNode, parent } = findNode(root, key);

  // Если нода не найдена, тогда ничего не делаем
  if (!targetNode) {
    return root;
  }

  if (targetNode === root) {
    return removeRoot(root);
  }

  const isLeftChild = targetNode === parent.left;

  // Если у найденной ноды нет потомков, то мы ее просто удаляем, устанавливая у соответствующего потомка parent null
  if (!targetNode.left && !targetNode.right) {
    if (isLeftChild) {
      parent.left = null;
    } else {
      parent.right = null;
    }

    return root;
  }

  // Если у найденной ноды есть один потомок (и нода не является корнем дерева), то мы ее удаляем, заменяя свойство left или right у родителя на единственного потомка найденной ноды
  if (!targetNode.left || !targetNode.right) {
    if (isLeftChild) {
      parent.left = targetNode.left || targetNode.right;
    } else {
      parent.right = targetNode.left || targetNode.right;
    }

    return root;
  }

  // Если у ноды есть оба потомка и она не является корнем
  removeNode(targetNode, parent);

  return root;
}

function test() {
  var node1 = new Node(2, null, null);
  var node2 = new Node(3, node1, null);
  var node3 = new Node(1, null, node2);
  var node4 = new Node(6, null, null);
  var node5 = new Node(8, node4, null);
  var node6 = new Node(10, node5, null);
  var node7 = new Node(5, node3, node6);
  var newHead = remove(node7, 10);
  console.assert(newHead.value === 5);
  console.assert(newHead.right === node5);
  console.assert(newHead.right.value === 8);
}
