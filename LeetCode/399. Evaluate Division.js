// https://leetcode.com/problems/evaluate-division/description/

const { test } = require('../test');

function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

calcEquation = (equations, values, queries) => {
  const map = new Map();

  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];

    if (!map.has(a)) map.set(a, new Map());
    if (!map.has(b)) map.set(b, new Map());

    map.get(a).set(b, 1 / values[i]);
    map.get(b).set(a, values[i]);
  }

  const results = [];

  const dfs = (a, b, visited = new Set()) => {
    if (map.get(a).has(b)) {
      return 1 / map.get(a).get(b);
    }

    visited.add(a);

    for (const [key, value] of map.get(a)) {
      if (visited.has(key)) continue;

      const result = dfs(key, b, visited);

      if (result !== -1) {
        return result / value;
      }
    }

    return -1;
  };

  for (const query of queries) {
    const [a, b] = query;

    if (!map.has(a) || !map.has(b)) {
      results.push(-1);
      continue;
    }

    if (a === b) {
      results.push(1);
      continue;
    }

    results.push(dfs(a, b));
  }

  return results;
};

test(calcEquation, [
  {
    input: [
      [
        ['a', 'b'],
        ['b', 'c'],
      ],
      [2.0, 3.0],
      [
        ['a', 'c'],
        ['b', 'a'],
        ['a', 'e'],
        ['a', 'a'],
        ['x', 'x'],
      ],
    ],
    expected: [6.0, 0.5, -1.0, 1.0, -1.0],
  },
  {
    input: [
      [
        ['a', 'b'],
        ['b', 'c'],
        ['bc', 'cd'],
      ],
      [1.5, 2.5, 5.0],
      [
        ['a', 'c'],
        ['c', 'b'],
        ['bc', 'cd'],
        ['cd', 'bc'],
      ],
    ],
    expected: [3.75, 0.4, 5.0, 0.2],
  },
  {
    input: [
      [['a', 'b']],
      [0.5],
      [
        ['a', 'b'],
        ['b', 'a'],
        ['a', 'c'],
        ['x', 'y'],
      ],
    ],
    expected: [0.5, 2.0, -1.0, -1.0],
  },
]);
