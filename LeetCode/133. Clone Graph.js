// https://leetcode.com/problems/clone-graph/description/

function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

// Важно,чтобы к моменту добавления в очередь дубликат вершины уже был помещен в map
// В противном случае вершины могут дублироваться
const cloneGraph = (node) => {
  const start = node;

  if (!start) return null;

  const map = new Map();

  const queue = [start];

  map.set(start, new Node(start.val));

  while (queue.length) {
    const current = queue.shift();

    for (const neighbor of current.neighbors) {
      if (!map.has(neighbor)) {
        queue.push(neighbor);

        map.set(neighbor, new Node(neighbor.val));
      }

      map.get(current).neighbors.push(map.get(neighbor));
    }
  }

  return map.get(start);
};

// Проверка результата
const traverse = (node) => {
  const result = [];

  const visited = new Set();

  const stack = [node];

  visited.add(node);

  while (stack.length) {
    const current = stack.pop();

    const current_neighbors = [];

    for (const neighbor of current.neighbors) {
      current_neighbors.push(neighbor.val);

      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        visited.add(neighbor);
      }
    }

    if (current_neighbors.length) {
      result.push(current_neighbors);
    }
  }

  console.log(result);
};

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);

node1.neighbors = [node2, node4];
node2.neighbors = [node1, node3];
node3.neighbors = [node2, node4];
node4.neighbors = [node1, node3];

traverse(cloneGraph(node1));
traverse(node1);
