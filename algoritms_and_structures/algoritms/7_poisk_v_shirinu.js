// Поиск в ширину в графе

// Кописываем граф
// Каждая вершина - это значение со свойством - массив вершин, с которыми вершина соединена
const graph = {};
graph.a = ["b", "c"];
graph.b = ["f"];
graph.c = ["d", "e"];
graph.d = ["f"];
graph.e = ["f"];
graph.f = ["g"];

// Параметры: граф, стартовая точка и конечная
function breadthSearch(graph, start, end) {
  let queue = [];

  // Сразу добавляем стартовую вершину в очередь
  queue.push(start);

  // Пока в очереди есть хоть один элемент
  while (queue.length > 0) {
    const current = queue.shift();

    // Если по текущей вершине в графе ничего не находится, тогда присваиваем ей пустой массив:
    // Их этой вершины никуда пути нет
    if (!graph[current]) {
      graph[current] = [];
    }

    if (graph[current].includes(end)) {
      return true;
    } else {
      queue = [...queue, ...graph[current]];
    }
  }
  return false;
}

console.log(breadthSearch(graph, "a", "e"));
