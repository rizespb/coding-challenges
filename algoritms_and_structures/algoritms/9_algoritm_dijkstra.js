// Поиск кратчайшего пути в графе

const graph = {};
graph.a = { b: 2, c: 1 };
graph.b = { f: 7 };
graph.c = { d: 5, e: 2 };
graph.d = { f: 2 };
graph.e = { f: 1 };
graph.f = { g: 1 };
graph.g = {};

function shortPath(graph, start, end) {
  // Объект для хранения кратчайших путей
  const costs = {};

  // Массив для хранения пройденных вершин
  const processed = [];

  // Массив для хранения сосдних вершин рассматриваемого узлы
  let neighbors = {};

  // Проходимся по объекту и добавляем в объект стоимость пути из стартовой точки в другую точку (node) или ставим какое-то очень большое число
  Object.keys(graph).forEach((node) => {
    if (node !== start) {
      // Находим стоимость пути из старта в вершину
      let value = graph[start][node];
      // Сохраняем стоимость пути
      costs[node] = value || 100000000;
    }
  });

  // Найти узел с минимальной стоимостью
  // Передаем объект со стоимостями и массив с пройденными вершинами
  let node = findNodeLowestCost(costs, processed);

  // Цикл повторяем до тех пор, пока не обойдем весь граф (пока нода не станет пустой)
  while (node) {
    const cost = costs[node];
    neighbors = graph[node];
    Object.keys(neighbors).forEach((neighbor) => {
      // Высчитываем новую стоимость (если найдем более низкую, то надо переписать в таблице)
      let newCost = cost + neighbors[neighbor];
      if (newCost < costs[neighbor]) {
        costs[neighbor] = newCost;
      }
    });

    // Добавляем обработанную вершину в массив обработанных вершин, чтобы больше ее не обрабатывать
    processed.push(node);
    node = findNodeLowestCost(costs, processed);
  }
  return costs;
}

// Функция поиска вершины с минимальной стоимостью пути из стартовой точки
function findNodeLowestCost(costs, processed) {
  let lowestCost = 100000000;

  // Вершина с минимальной стоимостью пути из стартовой точки
  let lowestNode;
  Object.keys(costs).forEach((node) => {
    let cost = costs[node];
    if (cost < lowestCost && !processed.includes(node)) {
      lowestCost = cost;
      lowestNode = node;
    }
  });

  //Возвращаем вершину с минимальной стоимостью пути из стартовой точки
  return lowestNode;
}

console.log(shortPath(graph, "a", "g"));
