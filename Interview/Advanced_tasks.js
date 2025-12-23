// ---------------------- 1 ----------------------
// Валидная последовательность скобок
// Valid Parentheses
// -----------------------------------------------

// https://leetcode.com/problems/valid-parentheses/description/

const isValid = (str) => {
  const stack = [];

  const map = { ')': '(', '}': '{', ']': '[' };

  const closing = new Set(Object.keys(map));
  const opened = new Set(Object.values(map));

  let i = 0;

  while (i < str.length) {
    const current = str[i];

    if (!opened.has(current) && !closing.has(current)) {
      continue;
    }

    if (opened.has(current)) {
      stack.push(current);
    }

    if (closing.has(current)) {
      const tail = stack.pop();

      if (map[current] !== tail) {
        return false;
      }
    }

    i++;
  }

  return !stack.length;
};

isValid('()'); // true
isValid('()[]{}'); // true
isValid('(]'); // false
isValid('([])'); // true
isValid('([)]'); // false

////////////////////////////////////////////////////////////////
// ---------------------- 3 ----------------------
// sortByFrequency
// -----------------------------------------------

// Сортировка символов в строке
// Дана строка произвольной длины, содержащая только символы в верхнем и нижнем регистрах.

// Требуется написать функцию, которая возвращает строку, отсортированную на основании частоты повторения букв.

// Регистр и порядок следования имеет значение.

// Magnetohydrodynamically000   =>   aaayyy000nnooddllMgethrmiс

const source = 'Magnetohydrodynamically000'; // => aaayyy000nnooddllMgethrmic

const sortByFrequency = (str) => {
  const map = new Map();

  for (const char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  const sorted = [...map.entries()].sort(([_a, a], [_b, b]) => b - a);

  return sorted.map(([char, num]) => char.repeat(num)).join('');
};

console.log(sortByFrequency('Magnetohydrodynamically000')); // aaayyy000nnooddllMgethrmic

////////////////////////////////////////////////////////////////
// ---------------------- 3 ----------------------
// Функция, осуществляющая повторные запросы
// -----------------------------------------------

// Функция get использует fetch для осуществления запросов
// В случае успешного запроса в ответе приходят данные в формате JSON
// В случае успешного ответа, функция возвращает данные в виде объекта JS
// В случае ошибки запроса get выполняет повторный запрос. Но не более 5 раз
// Если после 5 повторных запросов успешный ответ так и не был получен, функция должна пробросить ошибку с сообщением "Не удалось осуществить запрос"
// async/await не используем

const get = (url) => {
  // ...
};

get('http://some-url.com').then(console.log).catch(console.error);

////////////////////////////////////////////////////////////////
// ---------------------- 4 ----------------------
// Количество недавних вызовов
// Number of Recent Calls
// -----------------------------------------------

// https://leetcode.com/problems/number-of-recent-calls/description/

class RecentCounter {
  constructor() {
    this.requests = [];
  }

  ping = (t) => {
    this.requests.push(t);

    while (t - this.requests[0] > 3000) {
      this.requests.shift();
    }

    return this.requests.length;
  };
}

const recentCounter = new RecentCounter();

recentCounter.ping(1); // 1
recentCounter.ping(100); // 2
recentCounter.ping(3001); // 3
recentCounter.ping(3002); // 3
recentCounter.ping(6002); // 2
recentCounter.ping(10000); // 1

////////////////////////////////////////////////////////////////
// ---------------------- 5 ----------------------
// Числовой прямоугольник (по вертикали)
// -----------------------------------------------

// Написать функцию printRectangle(height, width), которая принимает высоту и ширину прямоугольника
// И выводит в консоль числовой прямоугольник согласно примерам ниже

// printRectangle(2, 3)
// 1 3 5
// 2 4 6

// printRectangle(4, 6)
//  1  5  9 13 17 21
//  2  6 10 14 18 22
//  3  7 11 15 19 23
//  4  8 12 16 20 24

// Обратить внимание, что ячейки в прямоугольнике должны быть одинаковой ширины (при этом надо использовать минимально возможную ширину)

const printRectangle = (height, width) => {
  length = String(height * width).length;

  firstNumberInRow = 1;

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const digits = [];

    for (let columnIndex = 0; columnIndex < width; columnIndex++) {
      const current = firstNumberInRow + height * columnIndex;

      const currentStr = String(current).padStart(length, ' ');

      digits.push(currentStr);
    }

    console.log(...digits);

    firstNumberInRow++;
  }
};

////////////////////////////////////////////////////////////////
// ---------------------- 6 ----------------------
// Числовая змейка
// -----------------------------------------------

// https://new.contest.yandex.ru/contests/41236/problem?id=149944%2F2022_10_13%2FsLQtZy5sBe

// Написать функцию printSnake(height, width), которая принимает высоту и ширину змейки
// И выводит в консоль числовую змейку согласно примерам ниже

// printSnake(2,3)
// 1 2 3
// 6 5 4

// printSnake(4,6)
//  1  2  3  4  5  6
// 12 11 10  9  8  7
// 13 14 15 16 17 18
// 24 23 22 21 20 19

// Обратить внимание, что ячейки в прямоугольнике должны быть одинаковой ширины (при этом надо использовать минимально возможную ширину)

const printSnake = (height, width) => {
  length = String(height * width).length;

  let isOdd = true;

  for (let rowIndex = 1; rowIndex <= height; rowIndex++) {
    const digits = [];

    if (isOdd) {
      for (let columnIndex = 1; columnIndex <= width; columnIndex++) {
        const current = (rowIndex - 1) * width + columnIndex;

        const currentStr = String(current).padStart(length, ' ');

        digits.push(currentStr);
      }
    } else {
      for (let columnIndex = width; columnIndex > 0; columnIndex--) {
        const current = (rowIndex - 1) * width + columnIndex;

        const currentStr = String(current).padStart(length, ' ');

        digits.push(currentStr);
      }
    }

    console.log(...digits);

    isOdd = !isOdd;
  }
};

////////////////////////////////////////////////////////////////
// ---------------------- 7 ----------------------
// Игрушки
// -----------------------------------------------

// https://new.contest.yandex.ru/contests/41238/problem?id=149944%2F2022_10_13%2F7DiV6js3vp

// Напишите программу, которая по списку детей и их игрушек определяет список игрушек, которые есть только у одного ребёнка.
// Выведите их в алфавитном порядке.

const anya = 'Аня: кукла, машинка, кукла, домик';
const borya = 'Боря: машинка, зайчик';
const vova = 'Вова: кубики, машинка';

findUniqueToys(anya, borya, vova);

// домик
// зайчик
// кубики
// кукла

// Решение 1
const findUniqueToys1 = (...inputs) => {
  let toys = [];

  for (const input of inputs) {
    const child_toys = input.split(': ')[1].split(', ');

    toys.push(...new Set(child_toys));
  }

  const allToys = new Set();
  const uniqueToys = new Set();

  for (const toy of toys) {
    if (!allToys.has(toy)) {
      allToys.add(toy);
      uniqueToys.add(toy);
    } else {
      uniqueToys.delete(toy);
    }
  }

  console.log([...uniqueToys].sort().join('\n'));
};

// Решение 2
const findUniqueToys2 = (...inputs) => {
  let toys = {};

  for (const input of inputs) {
    const current_toys = new Set(input.split(': ')[1].split(', '));

    for (const toy of current_toys) {
      toys[toy] = (toys[toy] || 0) + 1;
    }
  }

  const result = [];

  for (const key in toys) {
    if (toys[key] === 1) {
      result.push(key);
    }
  }

  console.log(result.sort().join('\n'));
};

// Решение 3 (высокая сложность)

const findUniqueToys3 = (...inputs) => {
  let toys = [];

  for (const input of inputs) {
    const child_toys = input.split(': ')[1].split(', ');

    toys.push(new Set(child_toys));
  }

  const result = [];

  for (let i = 0; i < toys.length; i++) {
    const current_set = toys[i];

    for (const toy of current_set) {
      let isValid = true;

      for (let j = i + 1; j < toys.length; j++) {
        if (toys[j].has(toy)) {
          toys[j].delete(toy);
          isValid = false;
        }
      }

      if (isValid) {
        result.push(toy);
      }
    }
  }

  result.sort();

  console.log(result.sort().join('\n'));
};
