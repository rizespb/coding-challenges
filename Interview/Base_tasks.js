////////////////////////////////////////////////////////////////
// ---------------------- 1 ----------------------
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

////////////////////////////////////////////////////////////////
// ---------------------- 2 ----------------------
// Банкноты
// -----------------------------------------------

// Дан массив номиналов купюр и сумма, которую нужно выдать этими купюрами

// Рассчитать оптимальный вариант выдачи (то есть тот, который будет содержать минимальное количество купюр)

let banknotes = [10, 100, 500, 1000, 5000];
let sum = 7400;

const getBanknotes = (sum) => {
  let rest = sum;

  const map = new Map();

  let index = banknotes.length - 1;

  while (rest) {
    if (rest < banknotes[index]) {
      index--;
      continue;
    }

    const banknote = Math.trunc(rest / banknotes[index]);
    map.set(banknotes[index], banknote);

    rest = rest % banknotes[index];
  }

  console.log(map);

  return map;
};

getBanknotes(7400); // { 5000: 1, 1000: 2, 100: 4 }

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
// ---------------------- 4 ----------------------
// Группировка
// -----------------------------------------------

// Имеется исходный массив из объектов пользователей
const users = [
  { id: 1, age: 20, isAdmin: false, name: 'Иван', city: 'Moscow', registred: false },
  { id: 2, age: 30, isAdmin: false, name: 'Дима', city: 'Omsk', registred: false },
  { id: 3, age: 20, isAdmin: true, name: 'Леха', city: 'Moscow', registred: true },
  { id: 5, age: 30, isAdmin: false, name: 'Иван', city: 'Moscow', registred: true },
];

// Необходимо преобразовать исходный массив в структуру,
// где данные пользователя будут сгруппированы по одному из полей объекта user (кроме поля id).
// Внутри сформированной группы должен лежать объект (или Map),
// ключами в котором должно быть поле "id",
// а значением, объект из исходного массива с соответствующим полем "id"(не включая само поле id)

// Один из вариантов результата (для поля age)
const result = {
  20: {
    1: { age: 20, isAdmin: false, name: 'Иван', city: 'Moscow', registred: false },
    3: { age: 20, isAdmin: true, name: 'Леха', city: 'Moscow', registred: true },
  },
  30: {
    2: { age: 30, isAdmin: false, name: 'Дима', city: 'Omsk', registred: false },
    5: { age: 30, isAdmin: false, name: 'Иван', city: 'Moscow', registred: true },
  },
};

function groupByField(arr, groupBy) {}

function groupByField(arr, groupBy) {
  let output = {};

  arr.forEach((item) => {
    const groupName = item[groupBy];

    if (!output[groupName]) {
      output[groupName] = {};
    }

    const { id, ...rest } = item;

    output[groupName][id] = rest;
  });

  return output;
}

////////////////////////////////////////////////////////////////
// ---------------------- 5 ----------------------
// findUnique
// -----------------------------------------------

// Написать findUnique – метод прототипа Array, который вернет только уникальные элементы массива

const array = [10, 5, 10, 0, 6, 6, 7, 2, 9, 9];

array.findUnique(); // [5, 0, 7, 2]

// Решение 1
Array.prototype.findUnique = function () {
  const uniq = [];
  let el;
  for (let i = 0; i < this.length; i++) {
    el = this[i];
    if (this.indexOf(el) === this.lastIndexOf(el)) {
      uniq.push(el);
    }
  }
  return uniq;
};

// Решение 2
Array.prototype.findUnique = function () {
  let unique = new Set();
  let repeated = new Set();
  this.forEach((x) => (!unique.has(x) ? unique.add(x) : repeated.add(x)));
  return [...unique].filter((x) => !repeated.has(x));
};

// Решение 3
Array.prototype.findUnique = function () {
  let map = new Map();
  let result = [];
  this.forEach((el) => (!map.has(el) ? map.set(el, 1) : map.set(el, map.get(el) + 1)));
  map.forEach((val, key) => val === 1 && result.push(key));
  return result;
};

////////////////////////////////////////////////////////////////
// ---------------------- 6 ----------------------
// Уникальные пары
// -----------------------------------------------

// Дан массив
let arr = [
  [1, 9],
  [1, 9],
  [5, 5],
  [6, 4],
  [4, 6],
  [7, 3],
  [3, 7],
  [0, 10],
];

// Требуется вернуть массив только с парами уникальных чисел (например, из двух пар [3, 7] и [7, 3] должна остаться только одна [3, 7] или [7, 3])
// В результате функция должна вернуть такой массив
// [ [1, 9], [5, 5], [6, 4], [7, 3], [0, 10] ]

const getUniquePairs = (arr) => {
  const result = [];

  const map = {};

  for (let i = 0; i < arr.length; i++) {
    const [first, second] = arr[i];
    const key = `${first}_${second}`;
    const reversedKey = `${second}_${first}`;

    if (!map[key] && !map[reversedKey]) {
      result.push(arr[i]);
      map[key] = true;
      map[reversedKey] = true;
    }
  }

  return result;
};
