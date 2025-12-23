// https://leetcode.com/problems/rotting-oranges/description/

// You are given an m x n grid where each cell can have one of three values:

// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

const orangesRotting = (grid) => {
  // Количество свежих апельсинов
  let freshes = 0;

  // Количество гнилых апельсинов
  let rottens = 0;

  // Стэк для гнилых апельсинов
  let stack = [];

  // Проходим по сетке. Считаем свежие и гнилые апельсины. Гнилые апельсины помещаем в стек
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const current = grid[i][j];

      if (current === 1) {
        freshes++;
        continue;
      }

      if (current === 2) {
        rottens++;

        stack.push({
          x: j,
          y: i,
        });
        continue;
      }
    }
  }

  // Общее количество апельсинов в сетке
  let total = freshes + rottens;

  let minutes = 0;

  while (stack.length > 0) {
    // Новый стек сгнивших апельсинов (отдельный стек, чтобы была возможность считать количество итераций - количество минут)
    const tempStack = [];

    // Флаг для того, чтобы остледить, сгнили ли новые апельсины на текущей итерации (надо ли увеличивать количество минут)
    let wasRotting = false;

    // Функция: если в ячейке сетки хранится свежий апельсин, то он гниет. Новый сгнивший апельсин попадает в стек
    const rotting = (x, y) => {
      if (grid[y]?.[x] === 1) {
        tempStack.push({ x, y });

        grid[y][x] = 2;
        rottens++;

        wasRotting = true;
      }
    };

    for (let i = 0; i < stack.length; i++) {
      const { x, y } = stack[i];

      rotting(x - 1, y);
      rotting(x + 1, y);
      rotting(x, y - 1);
      rotting(x, y + 1);
    }

    // Новый стек становится стеком
    stack = tempStack;

    // Если было гниение, увеличиваем минуты на 1
    minutes = wasRotting ? minutes + 1 : minutes;
  }

  // Если общее количество апельсинов не равно кличеству сгнивших, значит сгнили не все. Возвращаем -1
  return rottens === total ? minutes : -1;
};
