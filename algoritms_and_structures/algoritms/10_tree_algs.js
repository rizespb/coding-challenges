// Рекурсивный обход дерева
const tree = [
  {
    v: 5,
    c: [
      {
        v: 10,
        c: [
          {
            v: 11,
          },
        ],
      },
      {
        v: 7,
        c: [
          {
            v: 5,
            c: [
              {
                v: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    v: 5,
    c: [
      {
        v: 10,
      },
      {
        v: 15,
      },
    ],
  },
];

// Обойти рекурсивно
const recursive = (tree) => {
  let sum = 0;
  tree.forEach((node) => {
    sum += node.v;
    if (!node.c) {
      return node.v;
    }
    sum += recursive(node.c);
  });
  return sum;
};

// Обойти итеративно
const iteration = (tree) => {
  // Если дерево пустое, то возвращаем ноль
  if (!tree.length) {
    return 0;
  }
  let sum = 0;
  let stack = [];

  // Проходим по корневым узлам и добавляем в стек
  tree.forEach((node) => stack.push(node));

  // Пока стек не пустой
  while (stack.length) {
    const node = stack.pop();
    sum += node.v;
    if (node.c) {
      node.c.forEach((child) => stack.push(child));
    }
  }
  return sum;
};

console.log(iteration(tree));
// console.log(recursive(tree))
