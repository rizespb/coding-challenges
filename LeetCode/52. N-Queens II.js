// https://leetcode.com/problems/n-queens-ii/description/

// Матрица - массив
// Индекс элемента - это y-координата одной из предыдущих королев
// Значение элемента - это x-координата этой королевы
const isAvailableCell = (matrix, possibleY, possibleX) => {
  // Перебираем элементы матрицы
  // То есть, перебираем координаты предыдущих королев
  // i - y-координата - номер ряда
  // current - x-координата - номер столбца
  for (let i = 0; i < possibleY; i++) {
    const current = matrix[i];

    // Если новая x-кордината совпадает с x-координатой одной из прежних королев, то в эту клекту (ячейку) нельзя разместить новую королеву (по вертикали должна быть одна королева)
    if (possibleX === current) {
      return false;
    }

    // Проверяем диагональные элементы относительно новой королевы
    // Ищем, есть ли уже занятые ячейки по диагонали от проверяемой ячейки
    const diagonalXLeft = possibleX - (possibleY - i);
    const diagonalXRight = possibleX + (possibleY - i);

    if (diagonalXLeft === current || diagonalXRight === current) {
      return false;
    }
  }

  return true;
};

const totalNQueens = (n) => {
  let count = 0;

  // это будет линейный массив, у которого индекс элемента - это координата y занятой ячейки, а сам элемент - это координата x
  // Соответственно, [2, 0, 3, 1] соответствует следующему расположению элементов на доске:
  // [0, 0, 1, 0]
  // [1, 0, 0, 0]
  // [0, 0, 0, 1]
  // [0, 1, 0, 0]
  const matrix = [];

  // rowNumber - номер ряда, который заполняем сейчас
  const inner = (rowNumber) => {
    if (rowNumber >= n) {
      count++;
      return;
    }

    // Перебираем все ячейки в текущем ряду rowNumber и проверяем, можем ли поместить в нее королеву исходя из ранее заполненных рядов
    for (let x = 0; x < n; x++) {
      const isAvailable = isAvailableCell(matrix, rowNumber, x);

      // Если можно, то добавляем королеву по текущим координатам и переходим к проверке следующего ряда
      if (isAvailable) {
        matrix.push(x);

        inner(rowNumber + 1);

        // после того, как дошли до конца, удаляем добавленны выше элемент
        matrix.pop();
      }
    }
  };

  inner(0);

  return count;
};

console.log(totalNQueens(4)); // 2
console.log(totalNQueens(1)); // 1
