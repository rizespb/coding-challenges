const { test } = require('./test');

// Пример для 7:
// 7 * 7 = 49
// 4*4 + 9*9 = 97
// 9*9 + 7*7 = 130
// 1*1 + 3*3 + 0*0 = 10
// 1*1 + 0*0 = 1

const isHappy = (num) => {
  const hash = {};

  let current = num;

  while (true) {
    // Если число равно 1, то оно счастливое
    if (current === 1) {
      return true;
    }

    // Если мы раньше уже раскладывали это число, то попали в цикл
    if (current in hash) {
      return false;
    }

    // Помещаем текущее число в словарь
    hash[current] = true;

    // Для подсчета суммы квадратов цифр используем temp
    let temp = current;

    current = 0;

    // Добавляем к сумме квадрат последней цифры
    while (temp) {
      current += digit ** 2;

      // Сохраняем в temp без последней цифры
      temp -= Math.trunc(temp / 10);
    }
  }
};

test(isHappy, [
  // {
  //   input: [19],
  //   expected: true,
  // },
  // {
  //   input: [2],
  //   expected: false,
  // },
  {
    input: [7],
    expected: true,
  },
]);
