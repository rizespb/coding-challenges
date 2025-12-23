// ID успешной посылки 103617878

/*
-- ПРИНЦИП РАБОТЫ --

За основу работы программы взят алгоритм, обратный алгоритму Прима. 

При построении графа мы "избавляемся" от петель, а из кратных ребер выбираем ребро с максимальным весом.

Мы начинаем обходить граф с произвольной вершины (принимаем вершину с индексом 0 в качестве стартовой). Саму вершину помечаем как пройденную (массив visited). А вес ребра, которое ведет в эту вершину добавляем к результату (для стартовой вершины вес этого ребра принимаем равным нулю). Сохраняем все исходящие ребра в массив edges.

Из массива edges выбираем ребро с максимальным весом, которое ведет в непосещенную вершину. Повторяем алгоритм для этой вершины.

В тот момент, когда в массиве visited не останется непосещенных вершин, завершаем работу программы и возвращаем накопленный к этому моменту результат (максимальный вес остовного дерева)

Если в какой-то момент в массиве visited остались непосещенные вершины, но следующая вершина не найдена, значит в графе больше одной компоненты связности.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Временная сложность составляет O(∣V∣⋅∣E∣), где
∣V∣ – число вершин
∣E∣ – число ребер

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(∣V∣**2 + ∣V∣ + ∣E∣) дополнительной памяти для создания матрицы графа + массива посещенных вершин + массива ребер

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

const ERROR_MESSAGE = 'Oops! I did it again';

const setWeight = (currentValue, newValue) =>
  currentValue === undefined ? newValue : Math.max(currentValue, newValue);

const createGraph = (nodesAmount, triples) => {
  const graph = new Array(nodesAmount);

  triples.forEach((triple) => {
    const [from, to, weight] = triple.split(' ');

    const indexFrom = from - 1;
    const indexTo = to - 1;

    if (indexFrom === indexTo) return;

    if (graph[indexFrom] === undefined) {
      graph[indexFrom] = new Array(graph.length).fill(0);
    }
    if (graph[indexTo] === undefined) {
      graph[indexTo] = new Array(graph.length).fill(0);
    }

    graph[indexFrom][indexTo] = setWeight(graph[indexFrom][indexTo], weight);
    graph[indexTo][indexFrom] = setWeight(graph[indexTo][indexFrom], weight);
  });

  return graph;
};

const findMaxEdge = (edges, visited) => {
  let maxWeigth = -1;
  let target;

  for (let i = 0; i < edges.length; i++) {
    if (visited[edges[i][1]] !== true && edges[i][2] > maxWeigth) {
      target = edges[i][1];

      maxWeigth = edges[i][2];
    }
  }

  return { node: target, weight: maxWeigth };
};

const findMaxWeight = (graph) => {
  const nodesAmount = graph.length;
  const visited = new Array(nodesAmount);
  let visitedCounter = 0;

  const edges = new Array();

  let maxWeight = 0;

  const travers = (node, weight) => {
    maxWeight += Number(weight);

    visited[node] = true;
    visitedCounter++;

    const children = graph[node];

    children.forEach((weight, index) => {
      if (weight !== 0 && visited[index] !== true) {
        edges.push([node, index, weight]);
      }
    });

    const next = findMaxEdge(edges, visited);

    if (visitedCounter < nodesAmount) {
      if (next.node === undefined) {
        maxWeight = ERROR_MESSAGE;
        return;
      }

      travers(next.node, next.weight);
    }
  };

  travers(0, 0);

  return maxWeight;
};

function solve() {
  const [nodesAmount] = _inputLines[0].split(' ').map((el) => Number(el));

  const triples = _inputLines.slice(1);

  if (nodesAmount === 1) {
    console.log(0);
    return;
  }

  if (!triples.length) {
    console.log(ERROR_MESSAGE);
    return;
  }

  const graph = createGraph(nodesAmount, triples);

  const maxWeight = findMaxWeight(graph);

  console.log(maxWeight);
}
