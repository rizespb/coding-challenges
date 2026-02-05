// https://leetcode.com/problems/binary-search-tree-iterator/description/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

class BSTIterator {
  constructor(root) {
    this.stack = [];
    this.traverseLeft(root);
  }

  traverseLeft(node) {
    if (!node) return;

    this.stack.push(node);

    this.traverseLeft(node.left);
  }

  next() {
    const current = this.stack.pop();
    this.traverseLeft(current.right);

    return current.val;
  }

  hasNext() {
    return this.stack.length > 0;
  }
}
