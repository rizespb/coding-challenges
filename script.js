const { test } = require('./test');

class Node {
  constructor(key, value, prev = null, next = null) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = {};
    this.size = 0;
    this.tail = null;
    this.head = null;
  }

  get = (key) => {
    if (!(key in this.map)) return -1;

    this.updateList(key);

    return this.map[key].value;
  };

  put = (key, value) => {
    if (key in this.map) {
      this.map[key].value = value;
      this.updateList(key);

      return;
    }

    this.size++;

    const node = new Node(key, value);
    this.map[key] = node;

    if (!this.tail) {
      this.tail = node;
      this.head = node;
    } else {
      this.head.next = node;
      node.prev = this.head;
      this.head = node;
    }

    if (this.size > this.capacity) {
      delete this.map[this.tail.key];

      this.tail = this.tail.next;
      this.tail.prev = null;
      this.size--;
    }
  };

  updateList = (key) => {
    const node = this.map[key];

    if (this.size === 1 || this.head === node) return;

    if (this.tail === node) {
      this.tail = node.next;
      this.tail.prev = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    this.head.next = node;
    node.prev = this.head;
    this.head = node;
    this.head.next = null;
  };
}

const print = (cache) => {
  console.log('/////////////////////////////');
  console.log('tail', cache.tail);
  console.log('head', cache.head);
  console.log('map', cache.map);
};

const cache = new LRUCache(2);
cache.put(1, 1);
console.log(cache.map);
cache.put(2, 2);
// print(cache);
console.log(cache.put(3, 3));
console.log(cache.get(1));
console.log(cache.get(2));
console.log(cache.put(3, 333));
print(cache);

// test(permute, [
//   {
//     input: [[1, 2, 3]],
//     expected: [
//       [1, 2, 3],
//       [1, 3, 2],
//       [2, 1, 3],
//       [2, 3, 1],
//       [3, 1, 2],
//       [3, 2, 1],
//     ],
//   },
//   {
//     input: [[0, 1]],
//     expected: [
//       [0, 1],
//       [1, 0],
//     ],
//   },
//   {
//     input: [[1]],
//     expected: [[1]],
//   },
// ]);
