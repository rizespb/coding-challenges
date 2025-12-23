////////////////////////////////////////////////////////////////
/// ------------------------ 1 ----------------------------- ///
////////////////////////////////////////////////////////////////
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      const todos = state.todos;
      return {
        ...state,
        todos: todos.concat(action.payload),
      };
    case 'REMOVE_TODO':
      const todos = state.todos;
      const newTodos = todos.filter((todo) => todo.id !== action.id);
      return { ...state, todos: newTodos };
    default:
      return state;
  }
}

///////////// ------- Решение ------- //////////////
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const todos = state.todos;
      return {
        ...state,
        todos: todos.concat(action.payload),
      };
    }
    case 'REMOVE_TODO': {
      const todos = state.todos;
      const newTodos = todos.filter((todo) => todo.id !== action.id);
      return { ...state, todos: newTodos };
    }
    default:
      return state;
  }
}

// Переменная todos повторно объявляется в одном и том же блоке. Переменные, объявленные с помощью const и let, имеют блочную область видимости, что означает, что они не существуют вне блока, в котором они были вызваны. Чтобы это исправить, мы можем обернуть каждый из наших случаев в блок, чтобы изолировать переменные

////////////////////////////////////////////////////////////////
/// ------------------------ 2 ----------------------------- ///
////////////////////////////////////////////////////////////////
const user = {
  name: 'Tyler',
  age: 32,
  greet() {
    alert(`Hello, my name is ${this.name}`);
  },
  mother: {
    name: 'Jan',
    greet() {
      alert(`Hello, my name is ${this.mother.name}`);
    },
  },
};

user.mother.greet();

///////////// ------- Решение ------- //////////////
const user = {
  name: 'Tyler',
  age: 32,
  greet() {
    alert(`Hello, my name is ${this.name}`);
  },
  mother: {
    name: 'Jan',
    greet() {
      alert(`Hello, my name is ${this.name}`);
    },
  },
};

user.mother.greet();

// Когда мы вызываем user.mother.greet, мы можем понять, на что ссылается ключевое слово this, посмотрев "влево от точки" вызова - в этом случае на mother. Таким образом, внутри greet это как если бы мы имели my name is ${mother.mother.name}, что явно неверно. Вместо этого, поскольку ключевое слово this ссылается на mother, мы можем просто использовать this.name

////////////////////////////////////////////////////////////////
/// ------------------------ 3 ----------------------------- ///
////////////////////////////////////////////////////////////////
function addTriple(inputs: number[]): number {
  return inputs[0] + inputs[1] + inputs[2];
}

///////////// ------- Решение ------- //////////////
function addTriple(inputs: [number, number, number]): number {
  return inputs[0] + inputs[1] + inputs[2];
}

// TypeScript предупредит нас, если мы передадим что-то, кроме массива чисел, в эту функцию, но если массивсодержит менее 3 элементов, третий элементбудет undefined, и наша функция вернет NaN. TypeScript не может знать, сколько элементов в массиве, поэтому он не может нас предупредить. Изменив нашу сигнатуру типа на кортеж, TypeScript сможет предупредить нас, еслинаш массив не имеет достаточного количества элементов

////////////////////////////////////////////////////////////////
/// ------------------------ 4 ----------------------------- ///
////////////////////////////////////////////////////////////////
const petName = 'Leo';
const placeholder = '{NAME}';

const reminderTemplate =
  '{NAME} is due for another visit. Please call us so we can set up a new appointment. We look forward to seeing you and {NAME} soon.';

const reminder = reminderTemplate.replace(placeholder, petName);

///////////// ------- Решение ------- //////////////
const petName = 'Leo';
const placeholder = '{NAME}';

const reminderTemplate =
  '{NAME} is due for another visit. Please call us so we can set up a new appointment. We look forward to seeing you and {NAME} soon.';

const reminder = reminderTemplate.replaceAll(placeholder, petName);

// TМетод String.prototype.replace заменяет только первое вхождение, найденное в строке. Если может быть больше одного вхождения, используйте String.prototype.replaceAll, который является новым с ES2021

////////////////////////////////////////////////////////////////
/// ------------------------ 5 ----------------------------- ///
////////////////////////////////////////////////////////////////
function calcPrice(price, tax, discount) {
  tax = tax || 0.05;
  discount = discount || 0;
  return price - price * discount + price * tax;
}

///////////// ------- Решение ------- //////////////
function calcPrice(price, tax, discount) {
  tax = tax ?? 0.05;
  discount = discount ?? 0;
  return price - price * discount + price * tax;
}

// Оператор || проверяет на ложные значения, и 0 является ложным значением, что случайно применит стандартную налоговую ставку. Чтобы это исправить, вместо проверки на ложное значение, вы можете использовать оператор нулевого слияния (??)

////////////////////////////////////////////////////////////////
/// ------------------------ 6 ----------------------------- ///
////////////////////////////////////////////////////////////////
window.name = 'Mike Tyson';
const me = {
  name: 'Tyler',
  sayName() {
    console.log(this.name);
  },
};
const sayName = me.sayName;
sayName();

///////////// ------- Решение ------- //////////////
window.name = 'Mike Tyson';
const me = {
  name: 'Tyler',
  sayName() {
    console.log(this.name);
  },
};
const sayName = me.sayName;
sayName(); // Logs "Mike Tyson"

// Поскольку мы не находимся в строгом режиме, sayName не является методом, и мы не используем call или apply, this внутри sayName по умолчанию будет ссылаться на объект window

////////////////////////////////////////////////////////////////
/// ------------------------ 7 ----------------------------- ///
////////////////////////////////////////////////////////////////
function getRandomChoice(array) {
  return array[Math.floor(Math.random() * array.length + 1)];
}

getRandomChoice(['jersey mikes', 'firehouse', 'subway']);

///////////// ------- Решение ------- //////////////
function getRandomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

getRandomChoice(['jersey mikes', 'firehouse', 'subway']);

// Добавляя 1 к результату Math.random() array.length, он всегда будет больше 1, что означает, что первый элемент массива (jersey mikes) никогда не будет выбран. Вам либо нужно поставить subway первым, чтобы он никогда не выбирался (потому что он отвратителен), либо убрать + 1

////////////////////////////////////////////////////////////////
/// ------------------------ 8 ----------------------------- ///
////////////////////////////////////////////////////////////////
function getEvenNumbers(numbers) {
  let evenNumbers = [];

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 1) {
      evenNumbers.push(numbers[i]);
    }
  }

  return evenNumbers;
}

getEvenNumbers([1, 2, 3, 4, 5, 6]);

///////////// ------- Решение ------- //////////////
function getEvenNumbers(numbers) {
  let evenNumbers = [];

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      evenNumbers.push(numbers[i]);
    }
  }

  return evenNumbers;
}

getEvenNumbers([1, 2, 3, 4, 5, 6]);

// Наша логика немного неверна. n % 2 вернет 0, если n является четным числом. Ошибка заключается в том, что наш код проверяет, возвращает ли он 1 (что будет нечетным числом). Чтобы это исправить, мы можем изменить эту строку, чтобы увидеть, оценивается ли она в 0, а не в 1

////////////////////////////////////////////////////////////////
/// ------------------------ 9 ----------------------------- ///
////////////////////////////////////////////////////////////////
function* userGenerator(users) {
  for (let user of users) {
    if (!user.isActive) {
      return;
    }

    yield user;
  }
}

const users = [
  { name: 'Ben', isActive: true },
  { name: 'Alex', isActive: false },
  { name: 'Tyler', isActive: true },
];

const gen = userGenerator(users);

for (let user of gen) {
  console.log(user);
}

///////////// ------- Решение ------- //////////////
function* userGenerator(users) {
  for (let user of users) {
    if (!user.isActive) {
      continue;
    }
    yield user;
  }
}

const users = [
  { name: 'Ben', isActive: true },
  { name: 'Alex', isActive: false },
  { name: 'Tyler', isActive: true },
];

const gen = userGenerator(users);

for (let user of gen) {
  console.log(user);
}

// return остановит генератор, поэтому второй пользователь не будет возвращен, что приводит к тому, что только объект пользователя Ben будет выведен (вместо Ben и Tyler). Чтобы это исправить, используйте continue вместо return

////////////////////////////////////////////////////////////////
/// ------------------------ 10 ----------------------------- ///
////////////////////////////////////////////////////////////////
class Stack {
  constructor() {
    this.items = [];
    this.length = 0;
  }

  push(element) {
    this.length++;
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    this.length--;
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

///////////// ------- Решение ------- //////////////
class Stack {
  constructor() {
    this.items = [];
    this.length = 0;
  }

  push(element) {
    this.length++;
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    this.length--;
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }

    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

// Поскольку это стек (то есть: первый пришел, первый вышел), метод peek должен возвращать последний элемент в списке, а не первый. Также метод pop должен использовать pop() вместо shift(), чтобы удалить последний добавленный элемент в стек
