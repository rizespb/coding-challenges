// ID успешной посылки 103822184

/*
-- ПРИНЦИП РАБОТЫ --

Построим граф в виде списка смежности. Если тип пути B, тогда вместо этого ребра добавляем в граф обратное ребро. Соответственно, если изначально существовало два типа маршрутов из вершины N в вершину K (RRR...RRR и BBB...BBB), то получим цикл в графе.
С помощью DFS и цветов проверяем граф на наличие циклов

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Временная сложность составляет O(∣V∣ * ∣E∣), где
∣V∣ – число вершин
∣E∣ – число ребер

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(∣V∣ * ∣E∣ + ∣V∣) дополнительной памяти для создания матрицы графа + массива цветов

*/

const _readline = require('readline');

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];

_reader.on('line', (line) => {
  _inputLines.push(line);
});

process.stdin.on('end', solve);

const YES = 'YES';
const NO = 'NO';

const COLORS = {
  grey: 'grey',
  black: 'black',
};

let flag = true;

const createGraph = (strs) => {
  const graph = [];

  for (let strIndex = 0; strIndex < strs.length; strIndex++) {
    const str = strs[strIndex];

    for (let wayIndex = 0; wayIndex < str.length; wayIndex++) {
      const way = str[wayIndex];

      if (!graph[strIndex]) {
        graph[strIndex] = [];
      }
      if (!graph[wayIndex + 1]) {
        graph[wayIndex + 1] = [];
      }

      if (way === 'R') {
        graph[strIndex].push(strIndex + wayIndex + 1);
      } else {
        graph[strIndex + wayIndex + 1].push(strIndex);
      }
    }
  }

  return graph;
};

const checkCycles = (graph) => {
  const colors = new Array(graph.length);

  const DFS = (current) => {
    if (colors[current] === COLORS.grey) {
      flag = false;
      return;
    }

    colors[current] = COLORS.grey;

    const children = graph[current];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      flag && colors[child] !== COLORS.black && DFS(child);
    }

    colors[current] = COLORS.black;
  };

  for (let i = 0; i < graph.length; i++) {
    if (colors[i] !== COLORS.black && flag) {
      DFS(i);
    }
  }
};

function solve() {
  const nodesAmount = Number(_inputLines[0]);
  const strs = _inputLines.slice(1);

  if (nodesAmount === 1) {
    console.log(YES);
    return;
  }

  const graph = createGraph(strs);

  checkCycles(graph);

  console.log(flag ? YES : NO);
}
