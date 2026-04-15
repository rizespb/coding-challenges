// https://leetcode.com/problems/course-schedule-ii/submissions/1967523988

const { test } = require('../test');

// Задача представляет собой модификацию классического алгоритма топологической сортировки в ориентированном графе
// В общем случае, возможно, что далеко не все курсы имеют предварительное требования. И возможных комбинаций много
const findOrder = (numCourses, prerequisites) => {
  // карта, где ключ - курс, который является предварительным требованием prerequisite
  // значение - курсы, для которых ключ является предварительным
  const map = {};

  // Массив степеней: каждый индекс - это курс
  // Значение по этому курсу - количество необходимых предварительных курсов
  const degrees = Array.from({ length: numCourses }).fill(0);

  for (let i = 0; i < numCourses; i++) {
    map[i] = [];
  }

  // Заполняем карту
  for (const [course, prerequisite] of prerequisites) {
    map[prerequisite].push(course);

    degrees[course]++;
  }

  const queue = [];

  // Все курсы, у которых степень ноль (нет предварительных требований)
  // помещаем в очередь
  for (let i = 0; i < degrees.length; i++) {
    if (degrees[i] == 0) queue.push(i);
  }

  const result = [];

  while (queue.length) {
    const current = queue.shift();

    // В очереди или курсы, у которых нет предварительных требований
    // Или курсы, предварительные курсы требования к которым уже пройдены
    result.push(current);

    // Текущий курс считаем изученным
    // Уменьшаем степень всех курсов, у которых текущий является предварительным
    for (const nextCourse of map[current]) {
      degrees[nextCourse]--;

      // Если степень такого курса стала равна 0 (прошли все предварительные на предыдущих итерациях)
      // добавляем такой курс в очередь
      if (degrees[nextCourse] === 0) {
        queue.push(nextCourse);
      }
    }
  }

  // Если длина массива result совпала с количеством курсов, то возвращаем result
  return result.length === numCourses ? result : [];
};

test(findOrder, [
  {
    input: [2, [[1, 0]]],
    expected: [0, 1],
  },
  {
    input: [
      4,
      [
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
      ],
    ],
    expected: [0, 2, 1, 3],
  },
  {
    input: [1, []],
    expected: [0],
  },
]);
