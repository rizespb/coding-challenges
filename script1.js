const size = 9;
const empty = '.';

const availableNums = Array(size + 1).fill(true);

// Проверяем, является ли заполненная доска валидной
const isValidBoard = (board) => {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const current = board[y][x];

      if (current === empty) {
        return false;
      }
    }
  }
  // for (let y = 0; y < size; y++) {
  //   const currentSet = new Set(board[y]);

  //   if (currentSet.size !== size) {
  //     return false;
  //   }
  // }

  // const set = new Set();

  // for (let x = 0; x < size; x++) {
  //   for (let y = 0; y < size; y++) {
  //     set.add(board[y][x]);
  //   }

  //   if (set.size !== size) {
  //     return false;
  //   }

  //   set.clear();
  // }

  // let startY = 0;
  // let startX = 0;

  // while (startY < size && startX < size) {
  //   for (let y = startY; y < startY + 3; y++) {
  //     for (let x = startX; x < startX + 3; x++) {
  //       set.add(board[y][x]);
  //     }
  //   }

  //   if (set.size !== size) {
  //     return false;
  //   }

  //   set.clear();

  //   if (startX === size - 3) {
  //     startX = 0;
  //     startY += 3;
  //   } else {
  //     startX += 3;
  //   }
  // }

  return true;
};

// Находим все доступные варианты чисел для текущей позиции
const findAvailableNums = (y, x, board) => {
  // Проверяем числа в столбце
  for (let i = 0; i < size; i++) {
    const current = board[i][x];

    if (current !== empty) {
      availableNums[current] = false;
    }
  }

  // Проверяем числа в ряду
  for (let i = 0; i < size; i++) {
    const current = board[y][i];

    if (current !== empty) {
      availableNums[current] = false;
    }
  }

  // Проверяем числа в клетке 3 * 3
  const startX = x - (x % 3);
  const startY = y - (y % 3);

  for (let i = startY; i < startY + 3; i++) {
    for (let k = startX; k < startX + 3; k++) {
      const current = board[i][k];

      if (current !== empty) {
        availableNums[current] = false;
      }
    }
  }

  const result = [];

  // Если флаг по индексу i равен false, значит число i есть в ряду, столбце или клетке. Добавляем в result только индексы, элементы по которым равны true
  for (let i = 1; i < availableNums.length; i++) {
    availableNums[i] && result.push(i);
  }

  availableNums.fill(true);

  return result;
};

const iterateOverBoard = (fn, startY = 0, startX = 0) => {
  for (let y = startY; y < size; y++) {
    for (let x = startX; x < size; x++) {
      fn(y, x);
    }
  }
};

const solveSudoku = (board) => {
  // console.table(board);

  const fillBoard = (board) => {
    const variants = {};

    // Проверям доску и расставляем те значения, которые однозначны
    let flag = true;

    while (flag) {
      flag = false;

      iterateOverBoard((y, x) => {
        const current = board[y][x];

        if (current !== empty) {
          return;
        }

        const availableNums = findAvailableNums(y, x, board);

        const key = `${y}_${x}`;

        // Если возможен только один вариант, то записываем его в таблицу
        if (availableNums.length === 1) {
          board[y][x] = String(availableNums[0]);

          // И удаляем значение из variants, если оно было записано ранее
          delete variants[key];

          flag = true;
        } else {
          // Если вариантов несколько, сохраняем их в виде массива в variants по ключу, который является координатами
          variants[key] = availableNums;
        }
      });
    }

    return variants;
  };

  const variants = fillBoard(board);
  console.log(variants);

  const variantsEntries = Object.entries(variants);
  // board[6][2] = '5';
  // fillBoard();
  // console.log(isValidBoard(board));
  // console.table(board);

  for (const [coords, possibleValues] of variantsEntries) {
    const [y, x] = coords.split('_');

    for (const value of possibleValues) {
      board[y][x] = String(value);

      const copy = structuredClone(board);
      fillBoard(copy);

      if (isValidBoard(copy)) {
        console.log('ISVALID');
        fillBoard(board);

        return board;
      }

      board[y][x] = empty;
    }
  }

  return board;
};

const board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

const board1 = [
  ['.', '.', '9', '7', '4', '8', '.', '.', '.'],
  ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '2', '.', '1', '.', '9', '.', '.', '.'],
  ['.', '.', '7', '.', '.', '.', '2', '4', '.'],
  ['.', '6', '4', '.', '1', '.', '5', '9', '.'],
  ['.', '9', '8', '.', '.', '.', '3', '.', '.'],
  ['.', '.', '.', '8', '.', '3', '.', '2', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '6'],
  ['.', '.', '.', '2', '7', '5', '9', '.', '.'],
];
const board2 = [
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '9', '.', '.', '1', '.', '.', '3', '.'],
  ['.', '.', '6', '.', '2', '.', '7', '.', '.'],
  ['.', '.', '.', '3', '.', '4', '.', '.', '.'],
  ['2', '1', '.', '.', '.', '.', '.', '9', '8'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '2', '5', '.', '6', '4', '.', '.'],
  ['.', '8', '.', '.', '.', '.', '.', '1', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
];

// solveSudoku(board);
console.table(solveSudoku(board2));
