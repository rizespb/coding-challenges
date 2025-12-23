// https://leetcode.com/problems/course-schedule/description/

// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return true if you can finish all courses. Otherwise, return false.

// Создаем граф в виде массив
// Индекс - номер курса, значение - массив с курсами, для которых текущий курс (индекс) является предварительным
const createGraph = (numCourses, prerequisites) => {
  const graph = Array.from({ length: numCourses }).fill(null);

  for (const pair of prerequisites) {
    const [to, from] = pair;

    if (!graph[from]) {
      graph[from] = [];
    }

    graph[from].push(to);
  }

  return graph;
};

const canFinish = (numCourses, prerequisites) => {
  const graph = createGraph(numCourses, prerequisites);

  // Если появляется круговая зависимость при обходе графа - значит пройти курсы нельзя
  let isCycle = false;

  const traverse = (index) => {
    // Все дочерние вершины будем помещать в стек
    const stack = [...graph[index]];

    // Возможна ситуация, когда цикл возникнет на детях и не будет затрагивать вершину index. Тогда программа зациклится. Чтобы этого не произошло, заводим карту посещенных детей
    const visitedChildren = {};

    while (stack.length > 0) {
      const current = stack.pop();

      // Если этого ребенка уже посещали, то пропускаем его
      if (visitedChildren[current]) {
        continue;
      }

      // Если в стеке оказалась текущая вершина, значит попали в цикл.
      if (current === index) {
        isCycle = true;
        break;
      }

      visitedChildren[current] = true;

      // Если текущий курс не является предварительным ни для одного из курсов, то пропускаем итерацию
      if (!graph[current]) {
        continue;
      }

      stack.push(...graph[current]);
    }
  };

  // Будем выполнять обход графа начиная с каждой из вершин
  for (let i = 0; i < graph.length; i++) {
    if (isCycle) {
      break;
    }

    // Если текущий курс не является предварительным ни для одного из курсов, то пропускаем итерацию
    if (!graph[i]) {
      continue;
    }

    traverse(i);
  }

  // Если появляется круговая зависимость при обходе графа - значит пройти курсы нельзя
  return !isCycle;
};
