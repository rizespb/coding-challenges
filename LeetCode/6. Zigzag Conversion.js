// https://leetcode.com/problems/zigzag-conversion/description/

const convert = (str, numRows) => {
  if (numRows === 1) {
    return str;
  }

  const matrix = Array.from({ length: numRows }).map(() => []);

  // Каждая fullColumn (каждая вторая, каждая третья и т.д.) колонка должна быть заполнена полностью
  const fullColumn = numRows - 1;

  let row = 0;
  let column = 0;

  for (let i = 0; i < str.length; i++) {
    matrix[row][column] = str[i];

    // Если это колонка, которая должна быть заполнена полностью и это не последний ряд, то просто увеличиваем номер ряда
    if (column % fullColumn === 0 && row !== numRows - 1) {
      row++;

      // Иначе двигаемся влево вверх (по диагонали)
    } else {
      row--;
      column++;
    }
  }

  const result = matrix.map((row) => row.join('')).join('');

  return result;
};
