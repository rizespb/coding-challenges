////////////////////////////////////////////////////////////////
/// ------------------------ 1 ----------------------------- ///
////////////////////////////////////////////////////////////////
const getCapitalizedInitials = (name) =>
  name
    .trim()
    .split(' ')
    .forEach((name) => name.charAt(0))
    .join('')
    .toUpperCase();

///////////// ------- Решение ------- //////////////
const getCapitalizedInitials = (name) =>
  name
    .trim()
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase();

// Мы обращаемся к forEach так, как будто он возвращает массив, когда на самом деле он возвращает undefined. Вместо этого мы хотим использовать map, который работает аналогично forEach, но также создает и возвращает новый массив

////////////////////////////////////////////////////////////////
/// ------------------------ 2 ----------------------------- ///
////////////////////////////////////////////////////////////////
function addAndSort(array, element) {
  return array.push(element).sort();
}

///////////// ------- Решение ------- //////////////
function addAndSort(array, element) {
  array.push(element);

  return array.sort();
}

// Когда вы вызываете array.push, он не возвращает обновленный массив, а возвращает обновленную длину массива с новым элементом. Это означает, что вы не можете цеплять вызов .sort() в конце, так как результат .push - это число

////////////////////////////////////////////////////////////////
/// ------------------------ 3 ----------------------------- ///
////////////////////////////////////////////////////////////////
function factorial(n) {
  if (n === 0 || n === 1) return 1;

  for (const i = n - 1; i >= 1; i--) {
    n *= i;
  }

  return n;
}

///////////// ------- Решение ------- //////////////
function factorial(n) {
  if (n === 0 || n === 1) return 1;

  for (let i = n - 1; i >= 1; i--) {
    n *= i;
  }

  return n;
}

// Циклы for работают, присваивая значение переменной для каждой итерации, но переменные, определенные с помощью const, не могут быть переназначены. Вместо этого мы должны использовать let для определения нашей переменной

////////////////////////////////////////////////////////////////
/// ------------------------ 4 ----------------------------- ///
////////////////////////////////////////////////////////////////
function safeUpdate(obj, key, value) {
  if (!obj.hasOwnProperty(key)) {
    obj.key = value;
  }
}

const user = {
  name: 'Alice',
  age: 30,
};

safeUpdate(user, 'country', 'USA');
///////////// ------- Решение ------- //////////////
function safeUpdate(obj, key, value) {
  if (!obj.hasOwnProperty(key)) {
    obj[key] = value;
  }
}

const user = {
  name: 'Alice',
  age: 30,
};

safeUpdate(user, 'country', 'USA');

// Наша ошибка заключается в том, что мы добавляем литеральное свойство key в наш объект. В JavaScript, если вы хотите использовать переменную в качестве ключа объекта, вам нужно использовать квадратную нотацию вместоточечной

////////////////////////////////////////////////////////////////
/// ------------------------ 5 ----------------------------- ///
////////////////////////////////////////////////////////////////
function decodeBinaryCommands(binaryStrings) {
  const commands = [];

  for (let binStr of binaryStrings) {
    const command = parseInt(binStr, 10);

    switch (command) {
      case 1:
        commands.push('Start');
        break;
      case 2:
        commands.push('Stop');
        break;
      case 3:
        commands.push('Pause');
        break;
      case 4:
        commands.push('Resume');
        break;
      default:
        commands.push('Unknown');
        break;
    }
  }
  return commands;
}
const binaryCommands = ['0001', '0010', '0100', '0011', '1100'];

const decodedCommands = decodeBinaryCommands(binaryCommands);
console.log(decodedCommands);

///////////// ------- Решение ------- //////////////
function decodeBinaryCommands(binaryStrings) {
  const commands = [];
  for (let binStr of binaryStrings) {
    const command = parseInt(binStr, 2);

    switch (command) {
      case 1:
        commands.push('Start');
        break;
      case 2:
        commands.push('Stop');
        break;
      case 3:
        commands.push('Pause');
        break;
      case 4:
        commands.push('Resume');
        break;
      default:
        commands.push('Unknown');
        break;
    }
  }
  return commands;
}

const binaryCommands = ['0001', '0010', '0100', '0011', '1100'];

const decodedCommands = decodeBinaryCommands(binaryCommands);
console.log(decodedCommands);

// Если мы запустим этот код, мы получим вывод ['Start', 'Unknown', 'Unknown', 'Unknown', 'Unknown']. Это происходит потому, что функция parseInt имеет неправильный радиус. В этом случае мы хотим использовать радиус 2, чтобы преобразовать двоичную строку в десятичное число

////////////////////////////////////////////////////////////////
/// ------------------------ 6 ----------------------------- ///
////////////////////////////////////////////////////////////////
function reverseString(str) {
  return str.split('').reverse().join('');
}

let reversedString = reverseString('Hello,!');
console.log(reversedString);

///////////// ------- Решение ------- //////////////
function reverseString(str) {
  return [...str].reverse().join('');
}

let reversedString = reverseString('Hello,!');
console.log(reversedString);

// Эта ошибка возникает потому, что метод split рассматривает строку как массив 16-битных единиц, а не как массив символов, что приводит к неожиданному выводу: !ûû ,olleH. Используя Array.from(str) или [...str], строка разбивается на массив фактических символов, учитывающих суррогатные пары

////////////////////////////////////////////////////////////////
/// ------------------------ 7 ----------------------------- ///
////////////////////////////////////////////////////////////////
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
const user = {
  name: 'Tyler',
  age: 32,
  created: new Date(),
};

const copiedUser = deepCopy(user);

///////////// ------- Решение ------- //////////////
function deepCopy(obj) {
  return window.structuredClone(obj);
}

const user = {
  name: 'Tyler',
  age: 32,
  created: new Date(),
};

const copiedUser = deepCopy(user);

// Глубокая копия объекта - это копия, свойства которой не разделяют те же ссылки, что и у исходного объекта, из которого была сделана копия. Один из подходов для глубокой копии в JavaScript - использование JSON.stringify и JSON.parse. Это работает в нашем случае, но это преобразует created в строку. Чтобы этого избежать, вы можете использовать window.structuredClone вместо этого (при условии поддержки браузера)

////////////////////////////////////////////////////////////////
/// ------------------------ 8 ----------------------------- ///
////////////////////////////////////////////////////////////////
function removeElement(array, elementToRemove) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === elementToRemove) {
      array.splice(i, 1);
    }
  }
}

let myArray = [1, 2, 3, 2, 4];
removeElement(myArray, 2);

///////////// ------- Решение ------- //////////////
function removeElement(array, elementToRemove) {
  return array.filter((element) => element !== elementToRemove);
}

let myArray = [1, 2, 3, 2, 4];
myArray = removeElement(myArray, 2);

// Это решение не является идеальным, так как оно не учитвает, что массив изменяется во время итерации. Когда элемент по индексу 1 удаляется, элемент по индексу 2 сдвигается на индекс 1. Существует множество способов улучшить это, все с различными компромиссами. Это решение использует метод filter JavaScript, чтобы вернуть новый массив после фильтрации элемента для удаления

////////////////////////////////////////////////////////////////
/// ------------------------ 9 ----------------------------- ///
////////////////////////////////////////////////////////////////
function first() {
  var name = 'Jordyn';
  console.log(name);
}

function second() {
  var name = 'Jake';
  console.log(name);
}

console.log(name);

var name = 'Tyler';

first();
second();

console.log(name);

///////////// ------- Решение ------- //////////////

// Output:
// undefined
// Jordyn
// Jake
// Tyler

// Мы получаем undefined, Jordyn, Jake, затем Tyler. Это показывает нам, что вы можете рассматривать каждый новый контекст выполнения как имеющий свою уникальную переменную окружения. Хотя в других контекстах выполнения есть переменная name, движок JavaScript сначала будет искать в текущем контексте выполнения эту переменную

////////////////////////////////////////////////////////////////
/// ------------------------ 10 ----------------------------- ///
////////////////////////////////////////////////////////////////
function differenceInMilliseconds(date1, date2) {
  const { getTime: getTime1 } = new Date(date1);
  const { getTime: getTime2 } = new Date(date2);

  return getTime1() - getTime2();
}

differenceInMilliseconds('2021-01-01', '2021-01-02');

///////////// ------- Решение ------- //////////////

function differenceInMilliseconds(date1, date2) {
  const t1 = new Date(date1).getTime();
  const t2 = new Date(date2).getTime();

  return t1 - t2;
}

differenceInMilliseconds('2021-01-01', '2021-01-02');

// В JavaScript методы класса не являются прямыми свойствами экземпляра, а принадлежат прототипу класса. Когда вы пытаетесь деструктурировать метод, вы пытаетесь извлечь его непосредственно из экземпляра, что не работает, потому что getTime не является прямым свойством. С другой стороны, new Date().getTime() работает, потому что JavaScript проверяет цепочку прототипов и находит getTime в прототипе Date
